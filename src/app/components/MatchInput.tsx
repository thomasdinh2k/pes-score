"use client";
import { UserOutlined, TrophyOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Input, InputNumber, Space } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Match } from "../types/data.type";
import dayjs from "dayjs";
import { postMatch } from "../services/data.service";

type Props = { isEdit?: boolean; matchQuantity?: number };

function MatchInput({ isEdit = false, matchQuantity = 0 }: Props) {
	const handleSubmitForm: FormProps<Match>["onFinish"] = (values) => {
		if (isEdit) {
			console.log("Submitting edit form", values);
		} else {
			const submitPayload = {
				...values,
				match_number: matchQuantity + 1,
				date: dayjs().format("YYYY-MM-DD"),
				time: dayjs().format("HH:mm"),
			};
			console.log("Submitting new form", submitPayload);
			postMatch(submitPayload);
		}
	};

	const [form] = Form.useForm();

	const currentScore = {
		home_score: form.getFieldValue("home_score") || 0,
		away_score: form.getFieldValue("away_score") || 0,
	};
	// currentScore = form.getFieldsValue(["home_score", "away_score"]);

	const handleUpdateScoreInput = (
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
			<h2>
				Match Input{" "}
				<span className="text-xs font-thin">
					(Currently have {matchQuantity})
				</span>
			</h2>

			<Form
				form={form}
				layout="vertical"
				onFinish={handleSubmitForm}
				initialValues={{ home_score: 0, away_score: 0 }}
			>
				{/* Player name */}
				<FormItem
					label="Home Player"
					name="home_player"
					rules={[{ required: true }]}
				>
					<Input
						name="home_player"
						placeholder="Thomas"
						addonBefore={<UserOutlined />}
					/>
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
						type="button"
						className="px-4 border"
						onClick={() => {
							handleUpdateScoreInput("home_score", "increase");
						}}
					>
						+
					</button>
					<button
						type="button"
						className="px-4 border"
						onClick={() => {
							handleUpdateScoreInput("home_score", "decrease");
						}}
					>
						-
					</button>
				</Space.Compact>

				<FormItem
					label="Away Player"
					name="away_player"
					rules={[{ required: true }]}
				>
					<Input
						name="away_player"
						placeholder="Thomas"
						addonBefore={<UserOutlined />}
					/>
				</FormItem>
				<Space.Compact>
					<FormItem label="Away Team Name" name="away_team">
						<Input
							placeholder="Liverpool..."
							addonBefore={<TrophyOutlined />}
						/>
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
						type="button"
						className="px-4 border"
						onClick={() => {
							handleUpdateScoreInput("away_score", "increase");
						}}
					>
						+
					</button>
					<button
						type="button"
						className="px-4 border"
						onClick={() => {
							handleUpdateScoreInput("away_score", "decrease");
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
