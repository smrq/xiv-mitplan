import { useContext, useMemo } from 'react';
import { Redirect } from 'wouter';
import { Title } from '@mantine/core';

import { getFight, getJob } from '../data';

import { JobContext } from './JobContext';
import { Timeline } from './Timeline';

export function TimelinePage({ params }) {
	const jobIds = useContext(JobContext);
	const jobs = useMemo(() => jobIds.map(getJob), [jobIds]);

	const fight = getFight(params.fightId);
	if (!fight) {
		return <Redirect to="/" />;
	}

	return (
		<>
			<Title order={1} mb="xl">
				{fight.name}
			</Title>
			<Timeline fight={fight} jobs={jobs} />
		</>
	);
}
