document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
	const getInputValue = (id) => document.getElementById(id).value;
	const description = getInputValue('issueDescription');
	const severity = getInputValue('issueSeverity');
	const assignedTo = getInputValue('issueAssignedTo');
	const status = 'Open';
	const id = Math.floor(Math.random() * 100000000) + '';

	const issue = { id, description, severity, assignedTo, status };
	let issues = [];
	if (localStorage.getItem('issues')) {
		issues = JSON.parse(localStorage.getItem('issues'));
	}
	if (description && severity && assignedTo) {
		issues.push(issue);
		localStorage.setItem('issues', JSON.stringify(issues));
	} else {
		alert('You should fillup This Fields...!');
	}

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

const deleteIssue = (id) => {
	let isConfirm = confirm('Are you sure to Remove this Issue');
	if (isConfirm) {
		const issues = JSON.parse(localStorage.getItem('issues'));
		const remainingIssues = issues.filter((issue) => issue.id != id);

		localStorage.setItem('issues', JSON.stringify(remainingIssues));
		fetchIssues();
	}
};

const fetchIssues = () => {
	const issues = JSON.parse(localStorage.getItem('issues'));
	const issuesList = document.getElementById('issuesList');

	issuesList.innerHTML = '';
	let closedIssue = 0;
	let openIssue = 0;

	for (var i = 0; i < issues.length; i++) {
		const { id, description, severity, assignedTo, status } = issues[i];

		if (status === 'Closed') {
			btnClosed = `<a href="javascript:void(0)" onclick="closeIssue(${id})" class="btn btn-warning"disabled>Close</a>`;
			closedIssue++;
		} else {
			btnClosed = `<a href="javascript:void(0)" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>`;
			openIssue++;
		}
		issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              ${btnClosed}
                              <a href="javascript:void(0)" onclick="deleteIssue(${id})" class="btn btn-danger" >Delete</a>
							  </div>`;
	}
	document.getElementById('OpenCount').innerText = openIssue;
	document.getElementById('closedCount').innerText = closedIssue;
	document.getElementById('totalCount').innerText = openIssue + closedIssue;
};
