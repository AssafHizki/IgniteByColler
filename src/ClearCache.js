import React, { useState, useEffect } from "react";
import packageJson from "../package.json";
import moment from "moment";
import LoadingPage from "./components/common/LoadingPage";

const buildDateGreaterThan = (latestDate, currentDate) => {
    const momLatestDateTime = moment(latestDate);
    const momCurrentDateTime = moment(currentDate);

    return (momLatestDateTime.isAfter(momCurrentDateTime));
};

const WithClearCache = ({ Component }) => {
    const [isLatestBuildDate, setIsLatestBuildDate] = useState(false);

    useEffect(() => {
        fetch("/meta.json")
            .then((response) => response.json())
            .then((meta) => {
                const latestVersionDate = meta.buildDate;
                const currentVersionDate = packageJson.buildDate;

                const shouldForceRefresh = buildDateGreaterThan(latestVersionDate, currentVersionDate);

                if (shouldForceRefresh) {
                    refreshCacheAndReload();
                } else {
                    setIsLatestBuildDate(true);
                }
            }
            )
            .catch(e => {
                console.log(e);
            })
            ;
    }, []);

    const refreshCacheAndReload = () => {
        if (caches) {
            // Service worker cache should be cleared with caches.delete()
            caches.keys().then((names) => {
                for (const name of names) {
                    caches.delete(name);
                }
            });
        }

        // delete browser cache and hard reload
        window.location.reload(true);
    };

    if (!isLatestBuildDate) {
        return <LoadingPage />;
    }

    return <Component />;
}

export default WithClearCache;