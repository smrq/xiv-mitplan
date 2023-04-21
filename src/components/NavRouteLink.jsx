import { Link, useRoute } from 'wouter';
import { NavLink } from '@mantine/core';

export function NavRouteLink(props) {
	const { disabled, href, ...rest } = props;

	const [isActive] = useRoute(href);

	if (disabled) {
		return <NavLink disabled {...rest} />;
	}

	return (
		<Link href={href}>
			<NavLink {...rest} active={isActive} />
		</Link>
	);
}
