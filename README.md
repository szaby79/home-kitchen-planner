# Home Kitchen Planner

A modern, responsive kitchen planning application built with React, TypeScript, and Tailwind CSS. Designed specifically for Hungarian users to plan weekly meals and generate shopping lists from traditional Hungarian recipes.

## 🌟 Features

### Recipe Management
- Over 65+ pre-loaded traditional Hungarian recipes categorized as soups, main dishes, and desserts
- Each recipe includes ingredients, preparation instructions, serving sizes, and meal type (lunch, dinner, or both)
- Full CRUD functionality for managing your own recipes through the admin interface

### Weekly Meal Planning
- Plan meals for each day of the week (Monday-Sunday in Hungarian: Hétfő-Vasárnap)
- Separate slots for lunch and dinner for each day
- Adjustable serving sizes and number of days per meal
- Random generator to automatically fill the week with specified numbers of lunches and dinners

### Smart Shopping List
- Automatically calculates ingredients needed based on planned meals
- Both weekly and daily views of the shopping list
- Manual item addition capability
- Checkbox functionality to mark items as purchased
- Quantity calculations based on serving sizes and number of days

### Responsive Design
- Mobile-friendly interface with collapsible navigation
- Clean, modern UI with intuitive controls
- Local storage persistence for all data

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: Custom React hooks
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Testing**: Vitest

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   └── ui/             # shadcn/ui components
├── data/               # Default recipe data
├── hooks/              # Custom React hooks
├── pages/              # Application pages
├── types/              # TypeScript type definitions
└── lib/                # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd home-kitchen-planner
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser at `http://localhost:5173`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## 🏗️ Architecture

### State Management
- `useRecipeStore`: Handles recipe data with localStorage persistence
- `usePlannerStore`: Manages weekly planning and shopping list generation with localStorage persistence

### Data Flow
1. Recipes are loaded from `src/data/recipes.ts` and stored in localStorage
2. The weekly plan is stored in localStorage and updates the shopping list in real-time
3. Shopping lists are dynamically calculated based on selected recipes and serving sizes

### Key Components
- **Layout Component**: Provides main navigation and context provider
- **Recipe Pages**: Browse, view details, and manage recipes
- **Planner Page**: Interactive weekly meal planning interface
- **Shopping Page**: Generated shopping lists with daily/weekly views
- **Admin Page**: Recipe management interface

## 📝 Usage

1. **Getting Started**: Visit the home page to see statistics about available recipes and quick links to main features

2. **Planning Process**:
   - Navigate to "Heti terv" (Weekly Plan)
   - Select recipes for each day's lunch and dinner
   - Adjust serving sizes and number of days as needed
   - The system automatically calculates required ingredients

3. **Shopping List Generation**:
   - Go to "Bevásárlólista" (Shopping List)
   - View ingredients needed for the planned week
   - Toggle between weekly and daily views
   - Add extra items as needed
   - Check off items while shopping

4. **Persistence**: All data (recipes, plans, shopping lists) is saved to localStorage so it persists between sessions

## 🎯 Purpose

This application is specifically designed for Hungarian users who want to plan traditional Hungarian meals efficiently, with a focus on family cooking and meal preparation. It combines the convenience of digital meal planning with the richness of Hungarian culinary traditions.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

If you have any questions or need assistance, please open an issue in the repository.
