function Home() {
  process.browser && console.log(`env MAGIC_NUMBER`, process.env.MAGIC_NUMBER);

  return (
    <div>
      <p>
        This is a Next.js app. Using the Marvel API, it was written to help
        reinforce concepts of React Hooks inside the Next.js framework. More
        info in the README.md
      </p>
    </div>
  );
}

export default Home;
