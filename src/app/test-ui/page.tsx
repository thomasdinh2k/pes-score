type Props = {};

const MatchHistoryMobile = (props: Props) => {
	return (
		<div className="">
			<div className="flex flex-col border-b border-gray-200 pb-2">
				<span className="top-half text-xs font-light text-gray-600 flex justify-between px-1 text-[0.5rem]">
					<p>Sat, 17 Aug</p>
					<p>17:00</p>
				</span>
				<div className="bottom-half flex justify-center items-center gap-4">
					<div className="flex flex-col gap-0 items-center align-middle">
						<span className="text-[0.5rem] -mb-2 font-light">
							Tankia
						</span>
						<p className="text-lg">Ipswich</p>
					</div>
					<div className="score-board bg-[#00985f] text-white px-2 py-1 font-bold rounded-md ">
						0 - 2
					</div>
					<div className="flex flex-col gap-0 items-center align-middle">
						<span className="text-[0.5rem] -mb-2 font-light">
							Son Tung
						</span>
						<p className="text-lg">Liverpool</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MatchHistoryMobile;
