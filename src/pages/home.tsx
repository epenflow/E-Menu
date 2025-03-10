import For from "~/components/utils/for";

const Home = () => {
  return (
    <div className="inline-flex">
      <For each={["H", "O", "M", "E"]}>
        {(char, key) => <p key={`${key}-${char}`}>{char}</p>}
      </For>
    </div>
  );
};
export default Home;
