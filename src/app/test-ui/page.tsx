type Props = {};

const MatchHistoryMobile = (props: Props) => {
	return (
		<div className="">
			<div className="flex flex-col border-t border-b border-gray-200 py-2">
				<span className="top-half text-xs font-light text-gray-600 flex justify-between px-1">
					<p>Sat, 17 Aug</p>
					<p>17:00</p>
				</span>
				<div className="bottom-half flex justify-center items-center gap-4">
					<div className="flex flex-col gap-0">
						<span className="text-xs">Tan Nguyen</span>
						<p>Ipswich</p>
					</div>
					<div className="score-board bg-[#00985f] text-white px-2 py-1 font-bold rounded-md ">
						0 - 2
					</div>
					<span>Liverpool</span>
				</div>
			</div>
		</div>
	);
};

export default MatchHistoryMobile;
