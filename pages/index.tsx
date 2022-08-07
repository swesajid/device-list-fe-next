import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.scss';

interface iDevice {
    id: number;
    name: string;
}

const Home = () => {
    const [devices, setDevices] = useState<iDevice[]>([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('device-list-token');
        router.push('/auth/login');
    };

    useEffect(() => {
        const token = localStorage.getItem('device-list-token');
        if (!token) router.push('/auth/login');
    }, [router]);

    useEffect(() => {
        const get_devices = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/devices`);
            const data = await res.json();
            setDevices(data.devices);
            setLoading(false);
        };
        const intervalId = setInterval(get_devices, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {loading ? (
                <p>Loading ...</p>
            ) : (
                <div className={styles.container}>
                    <div className={styles.outer}>
                        <div className={styles.count}>{devices.length} Devices Online</div>
                        {/* {devices.map((dev, i) => (
                            <div className={styles.inner}></div>
                        ))} */}
                    </div>
                </div>
            )}

            <button style={{ position: 'fixed' }} onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Home;
