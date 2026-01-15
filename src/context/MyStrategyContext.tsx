import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Strategy } from '../data/strategies';

interface SavedStrategy {
    strategy: Strategy;
    addedAt: string;
    isCompleted: boolean;
    isTodayTask: boolean;
}

interface MyStrategyContextType {
    savedStrategies: SavedStrategy[];
    addStrategy: (strategy: Strategy) => void;
    removeStrategy: (strategyId: string) => void;
    toggleComplete: (strategyId: string) => void;
    toggleTodayTask: (strategyId: string) => void;
    isStrategySaved: (strategyId: string) => boolean;
    todayTasks: SavedStrategy[];
}

const MyStrategyContext = createContext<MyStrategyContextType | undefined>(undefined);

const STORAGE_KEY = 'reading-strategy-my-strategies';

export function MyStrategyProvider({ children }: { children: ReactNode }) {
    const [savedStrategies, setSavedStrategies] = useState<SavedStrategy[]>(() => {
        if (typeof window === 'undefined') return [];
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedStrategies));
    }, [savedStrategies]);

    const addStrategy = (strategy: Strategy) => {
        if (savedStrategies.some((s) => s.strategy.id === strategy.id)) return;
        setSavedStrategies((prev) => [
            ...prev,
            {
                strategy,
                addedAt: new Date().toISOString(),
                isCompleted: false,
                isTodayTask: false,
            },
        ]);
    };

    const removeStrategy = (strategyId: string) => {
        setSavedStrategies((prev) => prev.filter((s) => s.strategy.id !== strategyId));
    };

    const toggleComplete = (strategyId: string) => {
        setSavedStrategies((prev) =>
            prev.map((s) =>
                s.strategy.id === strategyId ? { ...s, isCompleted: !s.isCompleted } : s
            )
        );
    };

    const toggleTodayTask = (strategyId: string) => {
        setSavedStrategies((prev) => {
            const currentTodayCount = prev.filter((s) => s.isTodayTask).length;
            const isCurrentlyTodayTask = prev.find((s) => s.strategy.id === strategyId)?.isTodayTask;

            // 최대 3개까지만 오늘 실행 리스트에 추가 가능
            if (!isCurrentlyTodayTask && currentTodayCount >= 3) {
                return prev;
            }

            return prev.map((s) =>
                s.strategy.id === strategyId ? { ...s, isTodayTask: !s.isTodayTask } : s
            );
        });
    };

    const isStrategySaved = (strategyId: string) => {
        return savedStrategies.some((s) => s.strategy.id === strategyId);
    };

    const todayTasks = savedStrategies.filter((s) => s.isTodayTask);

    return (
        <MyStrategyContext.Provider
            value={{
                savedStrategies,
                addStrategy,
                removeStrategy,
                toggleComplete,
                toggleTodayTask,
                isStrategySaved,
                todayTasks,
            }}
        >
            {children}
        </MyStrategyContext.Provider>
    );
}

export function useMyStrategy() {
    const context = useContext(MyStrategyContext);
    if (!context) {
        throw new Error('useMyStrategy must be used within MyStrategyProvider');
    }
    return context;
}
