import Header from "../components/Header";
import ExploreTabs from "../components/radix/ExploreTabs";

export default function Home() {
    // TODO: get current
    const server = "mstdn.social";

    return (
        <>
            <title>Explore | Mastio</title>
            
            <Header title="Explore" />
            <ExploreTabs server={server} />
        </>
    )
}
