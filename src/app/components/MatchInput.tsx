"use client";
import { Form, Input, Select, Space } from "antd";
import React from "react";

type Props = {};

function MatchInput({}: Props) {
    
    return (
		<div className="match-input">
			<h2>Match Input</h2>

			<Form layout="vertical">
				{/* Player name */}
				<span className=" font-semibold">Player Home</span>
				<Input name="player-1-name" placeholder="Thomas"></Input>

				<Space.Compact>
					<Input
						name="player-1-teamName"
						placeholder="Liverpool..."
					></Input>
					<Input type="number" defaultValue={0}></Input>
                    <button className="px-4 border">+</button>
                    <button className="px-4 border">-</button>
				</Space.Compact>
			</Form>
		</div>
	);
}

export default MatchInput;
