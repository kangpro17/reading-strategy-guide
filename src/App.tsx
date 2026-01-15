import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MyStrategyProvider } from './context/MyStrategyContext';
import { SurveyProvider } from './context/SurveyContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ReadingProcessPage from './pages/ReadingProcessPage';
import TextTypePage from './pages/TextTypePage';
import TextStructurePage from './pages/TextStructurePage';
import CognitiveStrategyPage from './pages/CognitiveStrategyPage';
import MyStrategyPage from './pages/MyStrategyPage';


function App() {
    return (
        <BrowserRouter>
            <SurveyProvider>
                <MyStrategyProvider>
                    <div className="min-h-screen">
                        <Header />
                        <main>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/process" element={<ReadingProcessPage />} />
                                <Route path="/text-type" element={<TextTypePage />} />
                                <Route path="/structure" element={<TextStructurePage />} />
                                <Route path="/cognitive" element={<CognitiveStrategyPage />} />
                                <Route path="/my-strategy" element={<MyStrategyPage />} />
                            </Routes>
                        </main>
                    </div>
                </MyStrategyProvider>
            </SurveyProvider>
        </BrowserRouter>
    );
}

export default App;

