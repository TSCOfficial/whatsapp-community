"use-strict"
import { atom, useAtom } from "jotai";

export const navTabsAtom = atom([]);

export function useNavTabActions() {
    const [_, setNavTabs] = useAtom(navTabsAtom);

    const addNavTab = (newTab) => {
        setNavTabs((tabs) => {
            if (tabs.some((t) => t === newTab)) return tabs;
            return [...tabs, newTab];
        });

    };

    const removeNavTab = (tab) => {
        setNavTabs((tabs) => tabs.filter((t) => t !== tab));
    };

    const removeAll = () => {
        setNavTabs([])
    }

    return { addNavTab, removeNavTab, removeAll };
}
