import { useRef, useEffect, useMemo } from 'react';
import { DataSet, Timeline as VisTimeline } from 'vis-timeline/standalone';

import {
	isJob,
	getJob,
	isCooldown,
	getCooldown,
} from '../data';

function serialize(items) {
	const data = items.map((item) => ({
		id: item.id,
		group: item.group,
		start: +item.start,
	}));
	return JSON.stringify(data);
}

function deserialize(json) {
	const data = JSON.parse(json);
	const items = data.map((item) => ({
		id: item.id,
		group: item.group,
		start: new Date(item.start),
	}));

	for (const item of items) {
		initTimelineItem(item);
	}

	return items;
}

function save(id, items) {
	const data = items.get();
	const json = serialize(data);
	localStorage.setItem(`timeline-${id}`, json);
}

function load(id) {
	const items = new DataSet();
	const json = localStorage.getItem(`timeline-${id}`);
	if (json) {
		const data = deserialize(json);
		items.add(data);
	}
	return items;
}

function initTimelineItem(item) {
	const cooldown = getCooldown(item.group);

	item.className = item.group;
	item.end = item.start.getTime() + cooldown.recast;
	item.style = `--ratio: ${
		(100 * cooldown.duration) / cooldown.recast
	}%; --color: ${cooldown.color};`;

	return item;
}

function createJobTimelineGroup(job) {
	const jobItem = {
		treeLevel: 0,
		id: job.id,
		nestedGroups: job.cooldowns.map((cooldown) => cooldown.id),
	};
	const cooldownItems = job.cooldowns.map((cooldown) => ({
		id: cooldown.id,
		treeLevel: 1,
	}));
	return [jobItem, ...cooldownItems];
}

function getTimelineOptions(fight, items) {
	return {
		showMajorLabels: false,
		showCurrentTime: false,
		format: {
			minorLabels: {
				second: 'mm:ss',
				minute: 'mm:ss',
			},
		},
		zoomMin: 60000,
		start: 0,
		end: 120000,
		min: 0,
		max: fight.duration,
		groupHeightMode: 'fixed',
		snap: null,
		stack: false,
		itemsAlwaysDraggable: true,
		editable: {
			add: true,
			remove: true,
			updateGroup: false,
			updateTime: true,
			overrideItems: true,
		},

		groupTemplate: function (item) {
			if (item) {
				if (isJob(item.id)) {
					const job = getJob(item.id);
					return `<img src="/xiv-mitplan/${job.icon}"><span>${job.name}</span>`;
				} else if (isCooldown(item.id)) {
					const cooldown = getCooldown(item.id);
					return `<img src="/xiv-mitplan/${cooldown.icon}"><span>${cooldown.name}</span>`;
				}
			}
			return '';
		},

		template: function (item) {
			const cooldown = getCooldown(item.group);
			return `<img src="/xiv-mitplan/${cooldown.icon}">`;
		},

		onAdd: function (item, callback) {
			if (isCooldown(item.group)) {
				initTimelineItem(item);
				callback(item);
				save(fight.id, items);
			}
		},

		onMoving: function (item, callback) {
			const overlapping = items.get({
				filter: function (testItem) {
					return (
						testItem.id !== item.id &&
						item.start <= testItem.end &&
						item.end >= testItem.start &&
						item.group === testItem.group
					);
				},
			});

			if (overlapping.length === 0 && item.start >= 0) {
				callback(item);
			}
		},

		onMove: function (item, callback) {
			callback(item);
			save(fight.id, items);
		},

		onRemove: function (item, callback) {
			callback(item);
			save(fight.id, items);
		},
	};
}

export function Timeline(props) {
	const { fight, jobs } = props;

	const groups = useMemo(() => {
		const groups = new DataSet();
		for (const job of jobs) {
			groups.add(createJobTimelineGroup(job));
		}
		return groups;
	}, [jobs]);

	const items = useMemo(() => load(fight.id), [fight.id]);

	const container = useRef(null);

	useEffect(() => {
		if (container.current) {
			const options = getTimelineOptions(fight, items);
			const timeline = new VisTimeline(
				container.current,
				items,
				groups,
				options
			);

			for (const marker of fight.timeline) {
				timeline.addCustomTime(marker.start, marker.id);
				timeline.setCustomTimeMarker(marker.name, marker.id);
				timeline.setCustomTimeTitle(marker.title, marker.id);
			}

			return () => {
				timeline.destroy();
			};
		}
	}, [container, items, groups, fight]);

	return <div ref={container} />;
}
