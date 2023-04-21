import {
	Navbar,
	NavLink,
	SimpleGrid,
	Switch,
	Title,
} from '@mantine/core';

import { NavRouteLink } from './NavRouteLink';

export function ShellNavbar(props) {
	const { jobs, onJobsChange } = props;

	function toggleJob(id) {
		if (jobs.includes(id)) {
			onJobsChange(jobs.filter((j) => j !== id));
		} else {
			onJobsChange([...jobs, id]);
		}
	}

	return (
		<Navbar width={{ base: 300 }}>
			<Navbar.Section>
				<Title order={3} p="xs">
					Raids
				</Title>
				<NavLink label="Endwalker" defaultOpened>
					<NavLink label="Asphodelos" disabled />
					<NavLink label="Abyssos" defaultOpened>
						<NavRouteLink
							href="/timeline/p5s"
							label="The Fifth Circle | P5S"
							disabled
						/>
						<NavRouteLink
							href="/timeline/p6s"
							label="The Sixth Circle | P6S"
							disabled
						/>
						<NavRouteLink
							href="/timeline/p7s"
							label="The Seventh Circle | P7S"
							disabled
						/>
						<NavRouteLink
							href="/timeline/p8s1"
							label="The Eighth Circle | P8S Phase 1"
							disabled
						/>
						<NavRouteLink
							href="/timeline/p8s2"
							label="The Eighth Circle | P8S Phase 2"
						/>
					</NavLink>
				</NavLink>
				<NavLink label="Shadowbringers" disabled />
				<NavLink label="Stormblood" disabled />
				<NavLink label="Heavensward" disabled />
				<NavLink label="A Realm Reborn" disabled />
			</Navbar.Section>
			<Navbar.Section>
				<Title order={3} p="xs">
					Jobs
				</Title>
				<Title order={4} p="xs">
					Healers
				</Title>
				<SimpleGrid cols={2} p="xs">
					<Switch
						checked={jobs.includes('WHM')}
						onChange={() => toggleJob('WHM')}
						label="White Mage"
					/>
					<Switch
						checked={jobs.includes('SCH')}
						onChange={() => toggleJob('SCH')}
						label="Scholar"
						disabled
					/>
					<Switch
						checked={jobs.includes('AST')}
						onChange={() => toggleJob('AST')}
						label="Astrologian"
						disabled
					/>
					<Switch
						checked={jobs.includes('SGE')}
						onChange={() => toggleJob('SGE')}
						label="Sage"
					/>
				</SimpleGrid>
				<Title order={4} p="xs">
					Tanks
				</Title>
				<SimpleGrid cols={2} p="xs">
					<Switch
						checked={jobs.includes('PLD')}
						onChange={() => toggleJob('PLD')}
						label="Paladin"
						disabled
					/>
					<Switch
						checked={jobs.includes('WAR')}
						onChange={() => toggleJob('WAR')}
						label="Warrior"
					/>
					<Switch
						checked={jobs.includes('DRK')}
						onChange={() => toggleJob('DRK')}
						label="Dark Knight"
					/>
					<Switch
						checked={jobs.includes('GNB')}
						onChange={() => toggleJob('GNB')}
						label="Gunbreaker"
					/>
				</SimpleGrid>
			</Navbar.Section>
		</Navbar>
	);
}
