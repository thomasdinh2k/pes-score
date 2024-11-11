"use client";
import { Button, Form, FormProps, Input, InputNumber, Space } from "antd";
import FormItem from "antd/es/form/FormItem";

type Props = {};

function MatchInput({}: Props) {
	const handleSubmitForm: FormProps["onFinish"] = (values) => {
		console.log(values);
	};

	const [form] = Form.useForm();

	const currentScore = form.getFieldsValue(["home_score", "away_score"]);

	const handleUpdateScore = (
		type: any,
		indicator: "increase" | "decrease"
	) => {
		switch (type) {
			case "home_score":
				if (indicator === "increase") {
					form.setFieldValue(
						"home_score",
						currentScore["home_score"]++
					);
				} else {
					form.setFieldValue(
						"home_score",
						currentScore["home_score"]--
					);
				}
				break;
			case "away_score":
				if (indicator === "increase") {
					form.setFieldValue(
						"away_score",
						currentScore["away_score"]++
					);
				} else {
					form.setFieldValue(
						"away_score",
						currentScore["away_score"]--
					);
				}
				break;
			default:
				break;
		}
	};

	return (
		<div className="match-input">
			<h2>Match Input</h2>

			<Form layout="vertical" onFinish={handleSubmitForm} form={form}>
				{/* Player name */}
				<FormItem label="Home Player" name="home_player">
					<Input name="home_player" placeholder="Thomas"></Input>
				</FormItem>

				<Space.Compact>
					<FormItem label="Home Team Name" name="home_team">
						<Input placeholder="Liverpool..."></Input>
					</FormItem>
					<FormItem label="Score" name="home_score">
						<InputNumber
							defaultValue={0}
							min={0}
							max={15}
						></InputNumber>
					</FormItem>
					<button
						className="px-4 border"
						onClick={() => {
							handleUpdateScore("home_score", "increase");
						}}
					>
						+
					</button>
					<button className="px-4 border" onClick={() => {
							handleUpdateScore("home_score", "decrease");
						}}>-</button>
				</Space.Compact>

				<FormItem label="Away Player" name="away_player">
					<Input name="away_player" placeholder="Thomas"></Input>
				</FormItem>
				<Space.Compact>
					<FormItem label="Away Team Name" name="away_team">
						<Input placeholder="Liverpool..."></Input>
					</FormItem>
					<FormItem label="Score" name="away_score">
						<InputNumber
							defaultValue={0}
							min={0}
							max={15}
						></InputNumber>
					</FormItem>
					<button className="px-4 border" onClick={() => {
							handleUpdateScore("away_score", "increase");
						}}>+</button>
					<button className="px-4 border" onClick={() => {
							handleUpdateScore("away_score", "decrease");
						}}>-</button>
				</Space.Compact>

				<Form.Item>
					<Button type="primary" htmlType="submit">
						Add Result
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default MatchInput;
