import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { ProfileSidebar } from "../components/profile-sidebar/profile-sidebar"
import { authSelector } from "../store/selectors";
import styles from './profile.module.css'

export const ProfilePage = () => {
    return (
        <main className={styles.profileMainContent}>
            <section>
                <ProfileSidebar />
            </section>
            <section>
                <Outlet />
            </section>
        </main>
    );
}