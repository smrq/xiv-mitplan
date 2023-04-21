import { useState } from 'react';
import { AppShell } from '@mantine/core';

import { JobContext } from './JobContext';
import { ShellNavbar } from './ShellNavbar';
import { ShellHeader } from './ShellHeader';

function saveJobs(jobs) {
	const json = JSON.stringify(jobs);
	localStorage.setItem('jobs', json);
}

function loadJobs() {
	const json = localStorage.getItem('jobs');
	if (json) {
		return JSON.parse(json);
	} else {
		return ['WHM', 'SGE', 'WAR', 'GNB'];
	}
}

export function Shell(props) {
	const { children } = props;

	const [navbarOpened, setNavbarOpened] = useState(false);
	function toggleNavbarOpened() {
		setNavbarOpened((value) => !value);
	}

	const [jobs, setJobs] = useState(loadJobs);
	function handleJobsChange(jobs) {
		setJobs(jobs);
		saveJobs(jobs);
	}

	return (
		<JobContext.Provider value={jobs}>
			<AppShell
				padding="md"
				header={
					<ShellHeader
						navbarOpened={navbarOpened}
						toggleNavbarOpened={toggleNavbarOpened}
					/>
				}
				navbar={
					navbarOpened ? (
						<ShellNavbar jobs={jobs} onJobsChange={handleJobsChange} />
					) : undefined
				}
				styles={(theme) => ({
					main: {
						backgroundColor:
							theme.colorScheme === 'dark'
								? theme.colors.dark[8]
								: theme.colors.gray[0],
					},
				})}
			>
				{children}
			</AppShell>
		</JobContext.Provider>
	);
}
