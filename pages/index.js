import {useState} from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '@/app/page.module.css';


export default function Home(){
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const router = useRouter();

    const searchRepos = async () => {
        try {
            const res = await axios.get(`https://api.github.com/search/repositories?q=${query}`)
            setResults(res.data.items);
        } catch(err) {
            console.error(`Error fetching repos:`, err);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // 發送請求
        searchRepos();
    }

    const handleClickRepo = (owner, repo) => {
        router.push(`/repo/${owner}/${repo}`);
    }

    return (
        <div className={styles.container}>
            <h1>GitHub Repository Search</h1>
            <form className={styles.form} onSubmit={handleSearch}>
                <input type='text' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='typing to search...' />
                <button type='submit'>Search</button>
            </form>
            <ul className={styles.ul}>
                {results.map((item)=>(
                    <li key={item.id} onClick={()=> handleClickRepo(item.owner.login, item.name)}>
                        {item.full_name}
                    </li>
                ))}
            </ul>
        </div>
    )
}