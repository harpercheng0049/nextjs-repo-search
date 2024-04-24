import { useRouter } from "next/router";

export default function Repo(){
    const router = useRouter();
    const {owner, repo} = router.query;

    return (
        <div>
            <h1>Repository Details</h1>
            <p>Owner: {owner}</p>
            <p>Repo: {repo}</p>
        </div>
    )
}