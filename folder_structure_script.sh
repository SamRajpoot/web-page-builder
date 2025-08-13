#!/bin/bash

echo "📁 Creating Web Page Builder folder structure..."

# Create main directories
mkdir -p public
mkdir -p src/components/Elements
mkdir -p src/hooks
mkdir -p src/utils
mkdir -p src/context
mkdir -p src/data

# Create files to maintain folder structure
touch public/index.html
touch public/favicon.ico

touch src/components/Canvas.jsx
touch src/components/Sidebar.jsx
touch src/components/ConfigPanel.jsx
touch src/components/LayersPanel.jsx
touch src/components/PreviewPanel.jsx

touch src/components/Elements/TextElement.jsx
touch src/components/Elements/ImageElement.jsx
touch src/components/Elements/ButtonElement.jsx
touch src/components/Elements/ContainerElement.jsx
touch src/components/Elements/VideoElement.jsx

touch src/hooks/useHistory.js
touch src/hooks/useDragDrop.js
touch src/hooks/useCanvas.js

touch src/utils/codeGenerator.js
touch src/utils/dragDrop.js
touch src/utils/constants.js

touch src/context/BuilderContext.js
touch src/data/templates.js

touch src/App.jsx
touch src/index.js
touch src/styles.css

# Root files
touch .gitignore
touch package.json
touch webpack.config.js
touch babel.config.js
touch README.md

echo "✅ Folder structure created successfully!"
echo ""
echo "📂 Structure:"
echo "web-page-builder/"
echo "├── public/"
echo "│   ├── index.html"
echo "│   └── favicon.ico"
echo "├── src/"
echo "│   ├── components/"
echo "│   │   ├── Canvas.jsx"
echo "│   │   ├── Sidebar.jsx"
echo "│   │   ├── ConfigPanel.jsx"
echo "│   │   ├── LayersPanel.jsx"
echo "│   │   ├── PreviewPanel.jsx"
echo "│   │   └── Elements/"
echo "│   │       ├── TextElement.jsx"
echo "│   │       ├── ImageElement.jsx"
echo "│   │       ├── ButtonElement.jsx"
echo "│   │       ├── ContainerElement.jsx"
echo "│   │       └── VideoElement.jsx"
echo "│   ├── hooks/"
echo "│   │   ├── useHistory.js"
echo "│   │   ├── useDragDrop.js"
echo "│   │   └── useCanvas.js"
echo "│   ├── utils/"
echo "│   │   ├── codeGenerator.js"
echo "│   │   ├── dragDrop.js"
echo "│   │   └── constants.js"
echo "│   ├── context/"
echo "│   │   └── BuilderContext.js"
echo "│   ├── data/"
echo "│   │   └── templates.js"
echo "│   ├── App.jsx"
echo "│   ├── index.js"
echo "│   └── styles.css"
echo "├── .gitignore"
echo "├── package.json"
echo "├── webpack.config.js"
echo "├── babel.config.js"
echo "└── README.md"