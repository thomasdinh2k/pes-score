import MatchHistory from "./components/MatchHistory";
import MatchInput from "./components/MatchInput";
import Ranking from "./components/Ranking";

export default function Home() {
  return (
    <>
      <h1 className="text-center font-bold my-5">Thomas&apos;s PES History</h1>
      <section aria-label="match-input">
        <MatchInput />
      </section>

      <section aria-label="ranking">
        <Ranking />
      </section>

      <section aria-label="match-history">
        <MatchHistory />
      </section>
    </>
  );
}
