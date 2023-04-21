import {
	Anchor,
	Burger,
	Group,
	Header,
	Text,
} from '@mantine/core';

export function ShellHeader(props) {
	const { navbarOpened, toggleNavbarOpened } = props;
	return (
		<Header height={60}>
			<Group sx={{ height: '100%' }} px={20}>
				<Burger
					opened={navbarOpened}
					onClick={toggleNavbarOpened}
					size="sm"
					mr="l"
				/>
				<Text>FFXIV Mitigation Planner</Text>
				<Text ml="auto">
					made by <Anchor href="https://github.com/smrq">smrq</Anchor>
				</Text>
			</Group>
		</Header>
	);
}
