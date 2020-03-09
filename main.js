document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
	const getInputValue = (id) => document.getElementById(id).value;
	const description = getInputValue('issueDescription');
	const severity = getInputValue('issueSeverity');
	const assignedTo = getInputValue('issueAssignedTo');
	const id = Math.floor(Math.random() * 100000000) + '';
	const status = 'Open';

	const issue = { id, description, severity, assignedTo, status };
	let issues = [];
	if (localStorage.getItem('issues')) {
		issues = JSON.parse(localStorage.getItem('issues'));

		document.getElementById('total').innerHTML = issues.length + 1;
	}
	issues.push(issue);
	localStorage.setItem('issues', JSON.stringify(issues));

	document.getElementById('issueInputForm').reset();
	fetchIssues();
	e.preventDefault();
}

const closeIssue = (id) => {
	const issues = JSON.parse(localStorage.getItem('issues'));
	const currentIssue = issues.find((issue) => issue.id == id);
	currentIssue.status = 'Closed';
	currentIssue.description = `<del>${currentIssue.description}</del>`;

	localStorage.setItem('issues', JSON.stringify(issues));

	fetchIssues();
};

function onloadToatal() {
	const issues = JSON.parse(localStorage.getItem('issues'));
	if (issues) {
		document.getElementById('total').innerHTML = issues.length;
	}
}
function deleteIssue(id) {
	var issues = JSON.parse(localStorage.getItem('issues'));

	for (var i = 0; i < issues.length; i++) {
		if (issues[i].id == id) {
			issues.splice(i, 1);
			document.getElementById('total').innerHTML--;
		}
	}

	localStorage.setItem('issues', JSON.stringify(issues));

	fetchIssues();
}
const fetchIssues = () => {
	const issues = JSON.parse(localStorage.getItem('issues'));
	const issuesList = document.getElementById('issuesList');
	issuesList.innerHTML = '';

	for (var i = 0; i < issues.length; i++) {
		const { id, description, severity, assignedTo, status } = issues[i];

		issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
	}
};
onloadToatal();
