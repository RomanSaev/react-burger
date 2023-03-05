import { FC } from "react";
import { Outlet } from "react-router-dom";
import { ProfileSidebar } from "../components/profile-sidebar/profile-sidebar"
import styles from './profile.module.css'

export const ProfilePage: FC = () => {
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