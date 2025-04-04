'use client';

import { useEffect, useState } from 'react';

interface TimeProps {
	hour: number;
	minute: number;
	second: number;
}

export function FullTime() {
	const [time, setTime] = useState({
		hour: 0,
		minute: 0,
		second: 0,
	});

	const now = new Date().toLocaleDateString('pt-BR', {
		dateStyle: 'full',
	});

	useEffect(() => {
		const timer = setInterval(() => {
			setTime({
				hour: new Date().getHours(),
				minute: new Date().getMinutes(),
				second: new Date().getSeconds(),
			});
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	function formatTime(time: TimeProps) {
		return `${String(time.hour).padStart(2, '0')} : ${String(time.minute).padStart(2, '')} : ${String(time.second).padStart(2, '0')}`;
	}

	return (
		<div className="text-christalle flex flex-col items-end text-xs font-semibold">
			<span className="text-right">{now},</span>
			<span>
				às{' '}
				{formatTime({
					hour: time.hour,
					minute: time.minute,
					second: time.second,
				})}
			</span>
		</div>
	);
}
