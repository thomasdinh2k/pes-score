"use client";
import { TrophyOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Input, InputNumber, Space } from "antd";
import FormItem from "antd/es/form/FormItem";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllMatches, deleteMatch, editMatch, postMatch } from "../services/data.service";
import { setMessage } from "../slices/messageSlice";
import { RootState } from "../store";
import { Match } from "../types/data.type";
type Props = {
	isEdit?: boolean;
	matchQuantity?: number;
	setErrorMessage?: React.Dispatch<
		React.SetStateAction<
			| {
				message: string;
				description?: string;
			}
			| undefined
		>
	>;
};

function MatchInput({
	isEdit = false,
	matchQuantity = 0,
	setErrorMessage,
}: Props) {
	const triggerRefresh = () => {
		window.location.reload();
	};

	const dispatch = useDispatch();

	const matchDetailEditOnly = useSelector(
		(state: RootState) => state.match.matchDetail
	);

	const handleSubmitForm: FormProps<Match>["onFinish"] = async (values) => {
		if (isEdit) {
			// Handle edit case
			const submitPayload = {
				...values,
			};

			try {
				await editMatch(
					matchDetailEditOnly?.["_id"] || 0,
					submitPayload
				);
				triggerRefresh();
				dispatch(setMessage({
					type: "success",
					content: "Match has been edited!"
				}))
			} catch (error) {
				const errorMsg: { message: string; description: string } = {
					message: "Failed to edit match",
					description: "",
				};

				if (error instanceof Error) {
					errorMsg.description = error.message;
				}
				setErrorMessage?.(errorMsg);
			}
		} else {
			const submitPayload = {
				...values,
				match_number: Math.floor(Math.random() * 1000000),

				date: dayjs().format("YYYY-MM-DD"),
				time: dayjs().format("HH:mm"),
			};
			try {
				// Await the postMatch function to ensure it completes before proceeding
				await postMatch(submitPayload);
				triggerRefresh();
				dispatch(setMessage({
					type: "success",
					content: "Match has been created!"
				}))
			} catch (error) {
				const errorMsg: { message: string; description: string } = {
					message: "Failed to create match",
					description: "",
				};

				if (error instanceof Error) {
					errorMsg.description = error.message;
				}
				setErrorMessage?.(errorMsg);
			}
		}
	};

	const [form] = Form.useForm();

	const currentScore = {
		home_score: form.getFieldValue("home_score") || 0,
		away_score: form.getFieldValue("away_score") || 0,
	};

	const handleUpdateScoreInput = (
		type: "home_score" | "away_score",
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

	const handleDeleteMatch = async () => {
		try {
			await deleteMatch(matchDetailEditOnly?.["_id"] || 0);
			triggerRefresh();
		} catch (error) {
			const errorMsg: { message: string; description: string } = {
				message: "Failed to delete this match",
				description: "",
			};

			if (error instanceof Error) {
				errorMsg.description = error.message;
			}
			setErrorMessage?.(errorMsg);
		}
	};

	const handleDeleteAllMatches = async () => {
		try {
			await deleteAllMatches();
			triggerRefresh();
		} catch (error) {
			const errorMsg: { message: string; description: string } = {
				message: "Failed to delete all matches",
				description: "",
			};

			if (error instanceof Error) {
				errorMsg.description = error.message;
			}
			setErrorMessage?.(errorMsg);
		}
	}

	useEffect(() => {
		const handleSetInitialDataOnEdit = () => {
			form.resetFields(); // Reset temporary form data
			form.setFieldsValue(matchDetailEditOnly);
		};

		if (matchDetailEditOnly) {
			handleSetInitialDataOnEdit();
		}
	}, [form, matchDetailEditOnly]);

	return (
		<div className="match-input">
			{!isEdit && (
				<h2>
					Match Input{" "}
					<span className="text-xs font-thin">
						(Currently have {matchQuantity})
					</span>
				</h2>
			)}

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

				<Form.Item className="mt-4">
					<Button type="primary" htmlType="submit">
						{isEdit ? "Update" : "Add new"} Result
					</Button>
					{isEdit ? (
						<Button className="ml-4" onClick={handleDeleteMatch}>
							Delete Match
						</Button>
					) : (
						<Button className="ml-4" onClick={handleDeleteAllMatches}>
							Delete All Matches
						</Button>
					)}
				</Form.Item>
			</Form>
		</div>
	);
}

export default MatchInput;
