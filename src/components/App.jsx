import { Redirect, Router, Route, Switch } from 'wouter';
import { MantineProvider } from '@mantine/core';

import { useHashLocation } from '../util/useHashLocation';

import { Shell } from './Shell';
import { TimelinePage } from './TimelinePage';

export function App() {
	return (
		<MantineProvider withGlobalStyles withNormalizeCSS>
			<Router hook={useHashLocation}>
				<Shell>
					<Switch>
						<Route path="/timeline/:fightId" component={TimelinePage} />
						<Route>
							<Redirect to="/timeline/p8s2" />
						</Route>
					</Switch>
				</Shell>
			</Router>
		</MantineProvider>
	);
}
