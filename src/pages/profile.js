import { Outlet, useMatch } from "react-router-dom";
import { ProfileSettings } from "../components/profile-settings/profile-settings";
import { ProfileSidebar } from "../components/profile-sidebar/profile-sidebar"
import styles from './profile.module.css'

export const ProfilePage = () => {

    const match = useMatch({ path: 'profile', end: true });

    return (
        <main className={styles.profileMainContent}>
            <section>
                <ProfileSidebar />
            </section>
            <section>
                { match ? <ProfileSettings /> : 
                <Outlet />
                }
            </section>
        </main>
    );
}