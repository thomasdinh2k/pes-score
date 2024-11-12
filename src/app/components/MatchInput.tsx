"use client";
import { UserOutlined, TrophyOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Input, InputNumber, Space } from "antd";
import FormItem from "antd/es/form/FormItem";

type Props = {};

function MatchInput({}: Props) {
	const handleSubmitForm: FormProps["onFinish"] = (values) => {
		console.log(values);
	};

	const [form] = Form.useForm();

	let currentScore = {
		home_score: form.getFieldValue("home_score") || 0,
		away_score: form.getFieldValue("away_score") || 0,
	};
	// currentScore = form.getFieldsValue(["home_score", "away_score"]);

	const handleUpdateScore = (
		type: any,
		indicator: "increase" | "decrease"
	) => {
		switch (type) {
			case "home_score":
				form.setFieldValue(
					"home_score",
					indicator === "increase"
						? (currentScore.home_score += 1)
						: currentScore.home_score > 0
						? (currentScore.home_score -= 1)
						: 0
				);
				break;
			case "away_score":
				form.setFieldValue(
					"away_score",
					indicator === "increase"
						? (currentScore.away_score += 1)
						: currentScore.away_score > 0
						? (currentScore.away_score -= 1)
						: 0
				);
				break;
			default:
				break;
		}
	};

	return (
		<div className="match-input">
			<h2>Match Input</h2>

			<Form
				form={form}
				layout="vertical"
				onFinish={handleSubmitForm}
				initialValues={{ home_score: 0, away_score: 0 }}
			>
				{/* Player name */}
				<FormItem label="Home Player" name="home_player">
					<Input name="home_player" placeholder="Thomas" addonBefore={<UserOutlined />}/>
				</FormItem>

				<Space.Compact>
					<FormItem label="Home Team Name" name="home_team">
						<Input
							placeholder="Liverpool..."
							addonBefore={<TrophyOutlined />}
						/>
					</FormItem>
					<FormItem
						label="Score"
						name="home_score"
						rules={[
							{
								type: "number",
								min: 0,
								max: 15,
							},
							{
								validator: (_, value) =>
									Number.isInteger(value)
										? Promise.resolve()
										: Promise.reject(
												"Score must be an integer"
										  ),
							},
						]}
					>
						<InputNumber
							min={0}
							max={15}
							defaultValue={0}
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
					<button
						className="px-4 border"
						onClick={() => {
							handleUpdateScore("home_score", "decrease");
						}}
					>
						-
					</button>
				</Space.Compact>

				<FormItem label="Away Player" name="away_player">
					<Input name="away_player" placeholder="Thomas" addonBefore={<UserOutlined />} />
				</FormItem>
				<Space.Compact>
					<FormItem label="Away Team Name" name="away_team">
						<Input placeholder="Liverpool..." addonBefore={<TrophyOutlined/>} />
					</FormItem>
					<FormItem
						label="Score"
						name="away_score"
						rules={[
							{
								type: "number",
								min: 0,
								max: 15,
							},
							{
								validator: (_, value) =>
									Number.isInteger(value)
										? Promise.resolve()
										: Promise.reject(
												"Score must be an integer"
										  ),
							},
						]}
					>
						<InputNumber
							min={0}
							max={15}
							defaultValue={0}
						></InputNumber>
					</FormItem>
					<button
						className="px-4 border"
						onClick={() => {
							handleUpdateScore("away_score", "increase");
						}}
					>
						+
					</button>
					<button
						className="px-4 border"
						onClick={() => {
							handleUpdateScore("away_score", "decrease");
						}}
					>
						-
					</button>
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
