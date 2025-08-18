import React, { useState } from "react";

import Sidebar from "./components/Sidebar";
import Canvas from "./components/Canvas";
import LayersPanel from "./components/LayersPanel";
import PreviewPanel from "./components/PreviewPanel";
import ExportPanel from "./components/ExportPanel";
import { BuilderProvider } from "./context/BuilderContext";
import "./styles.css";

import AuthScreen from "./components/AuthScreen";

// Animated SVG background
const AnimatedBackground = () => (
	<div className="animated-bg">
		<svg
			viewBox="0 0 1440 900"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<defs>
				<linearGradient
					id="wave1"
					x1="0"
					y1="0"
					x2="1440"
					y2="900"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#a1c4fd" />
					<stop offset="1" stopColor="#c2e9fb" />
				</linearGradient>
				<linearGradient
					id="wave2"
					x1="0"
					y1="0"
					x2="1440"
					y2="900"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#818cf8" />
					<stop offset="1" stopColor="#a5b4fc" />
				</linearGradient>
			</defs>
			<path
				d="M0 700 Q 720 900 1440 700 L 1440 900 L 0 900 Z"
				fill="url(#wave1)"
				opacity="0.5"
			>
				<animate
					attributeName="d"
					dur="8s"
					repeatCount="indefinite"
					values="M0 700 Q 720 900 1440 700 L 1440 900 L 0 900 Z;
                  M0 720 Q 720 860 1440 720 L 1440 900 L 0 900 Z;
                  M0 700 Q 720 900 1440 700 L 1440 900 L 0 900 Z"
				/>
			</path>
			<path
				d="M0 800 Q 720 1000 1440 800 L 1440 900 L 0 900 Z"
				fill="url(#wave2)"
				opacity="0.35"
			>
				<animate
					attributeName="d"
					dur="10s"
					repeatCount="indefinite"
					values="M0 800 Q 720 1000 1440 800 L 1440 900 L 0 900 Z;
                  M0 820 Q 720 960 1440 820 L 1440 900 L 0 900 Z;
                  M0 800 Q 720 1000 1440 800 L 1440 900 L 0 900 Z"
				/>
			</path>
		</svg>
	</div>
);

// Floating Action Button (FAB)
const FloatingActionButton = () => (
	<button
		className="fab"
		title="Quick Actions"
		onClick={() => alert("Quick Actions Coming Soon!")}
	>
		<span className="fab-icon" role="img" aria-label="lightning">
			⚡
		</span>
	</button>
);

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null };
	}
	static getDerivedStateFromError(error) {
		return { hasError: true, error };
	}
	componentDidCatch(error, errorInfo) {
		// Optionally log errorInfo
	}
	render() {
		if (this.state.hasError) {
			return (
				<div style={{ padding: 40, color: "red", fontSize: 20 }}>
					<b>Something went wrong:</b>
					<pre
						style={{
							whiteSpace: "pre-wrap",
							marginTop: 16,
						}}
					>
						{String(this.state.error)}
					</pre>
				</div>
			);
		}
		return this.props.children;
	}
}

const App = () => {
   const [user, setUser] = useState(null);
   
   if (!user) {
	   return <AuthScreen onAuth={setUser} />;
   }

   return (
	   <ErrorBoundary>
		   <AnimatedBackground />
		   <BuilderProvider>
			   <BuilderConsumerUI />
		   </BuilderProvider>
	   </ErrorBoundary>
   );
};

import { useBuilder } from "./context/BuilderContext";

function BuilderConsumerUI() {
   const { dispatch } = useBuilder();
   return (
	   <div className="app-container">
		   <Sidebar />
		   <LayersPanel />
		   <div
			   style={{
				   flex: 1,
				   display: "flex",
				   flexDirection: "column",
			   }}
		   >
			   <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 8 }}>
				   <button onClick={() => dispatch({ type: "UNDO" })} style={{ padding: "6px 18px", borderRadius: 8, background: "#e0e7ff", color: "#3730a3", border: 0, fontWeight: 600, cursor: "pointer" }}>Undo</button>
				   <button onClick={() => dispatch({ type: "REDO" })} style={{ padding: "6px 18px", borderRadius: 8, background: "#e0e7ff", color: "#3730a3", border: 0, fontWeight: 600, cursor: "pointer" }}>Redo</button>
			   </div>
			   <PreviewPanel>
				   <Canvas />
			   </PreviewPanel>
		   </div>
		   <div style={{ width: 340, background: "#f8fafc", borderLeft: "1.5px solid #e0e7ff", padding: "24px 0", minHeight: "100vh", boxSizing: "border-box" }}>
			   <ExportPanel />
		   </div>
		   <FloatingActionButton />
	   </div>
   );
}

export default App;
