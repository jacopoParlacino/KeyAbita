Project Structure
=================

```
├── 📁 src
│   ├── 📁 components
│   │   ├── 📁 Header
│   │   │   ├── 📄 Hamburger.tsx
│   │   │   ├── 🎨 Header.module.scss
│   │   │   └── 📄 Header.tsx
│   │   ├── 📁 Hero
│   │   │   ├── 🎨 Hero.module.scss
│   │   │   └── 📄 Hero.tsx
│   │   ├── 📁 MultiStepForm
│   │   │   ├── 📁 AddressSearch
│   │   │   │   ├── 🎨 AddressSearch.module.scss
│   │   │   │   └── 📄 AddressSearch.tsx
│   │   │   ├── 📁 Button
│   │   │   │   ├── 🎨 Button.module.scss
│   │   │   │   └── 📄 Button.tsx
│   │   │   ├── 📁 Counter
│   │   │   │   ├── 🎨 Counter.module.scss
│   │   │   │   └── 📄 Counter.tsx
│   │   │   ├── 📁 HeaderForm
│   │   │   │   ├── 🎨 HeaderForm.module.scss
│   │   │   │   └── 📄 HeaderForm.tsx
│   │   │   ├── 📁 ImmobileCondition
│   │   │   │   ├── 🎨 ImmobileCondition.module.scss
│   │   │   │   └── 📄 ImmobileCondition.tsx
│   │   │   ├── 📁 InputField
│   │   │   │   ├── 🎨 InputField.module.scss
│   │   │   │   └── 📄 InputField.tsx
│   │   │   ├── 📁 MetricRangeSelector
│   │   │   │   ├── 🎨 MetricRangeSelector.module.scss
│   │   │   │   └── 📄 MetricRangeSelector.tsx
│   │   │   ├── 📁 ProgressBar
│   │   │   │   ├── 🎨 ProgressBar.module.scss
│   │   │   │   └── 📄 ProgressBar.tsx
│   │   │   ├── 📁 PropertyTypeSelector
│   │   │   │   ├── 🎨 PropertyTypeSelector.module.scss
│   │   │   │   └── 📄 PropertyTypeSelector.tsx
│   │   │   ├── 📁 StepCounter
│   │   │   │   ├── 🎨 StepCounter.module.scss
│   │   │   │   └── 📄 StepCounter.tsx
│   │   │   ├── 📁 StepperNavigation
│   │   │   │   ├── 🎨 StepperNavigation.module.scss
│   │   │   │   └── 📄 StepperNavigation.tsx
│   │   │   ├── 📁 ToggleSwitch
│   │   │   │   ├── 🎨 ToggleSwitch.module.scss
│   │   │   │   └── 📄 ToggleSwitch.tsx
│   │   │   ├── 📁 VerticalSidebar
│   │   │   │   ├── 🎨 VerticalSidebar.module.scss
│   │   │   │   └── 📄 VerticalSidebar.tsx
│   │   │   ├── 📁 hooks
│   │   │   │   └── 📄 useMultiStepForm.ts
│   │   │   ├── 📁 steps
│   │   │   │   ├── 📄 Step1Property.tsx
│   │   │   │   ├── 📄 Step2Condition.tsx
│   │   │   │   ├── 📄 Step3Dotazioni.tsx
│   │   │   │   ├── 📄 Step4UserData.tsx
│   │   │   │   └── 📄 Step5Confirmation.tsx
│   │   │   ├── 🎨 MultiStepForm.module.scss
│   │   │   ├── 📄 MultiStepForm.tsx
│   │   │   ├── 📄 types.ts
│   │   │   └── 📄 validation.ts
│   │   └── 📄 Footer.tsx
│   ├── 📁 pages
│   │   ├── 📁 Home
│   │   │   ├── 🎨 Home.module.scss
│   │   │   └── 📄 Home.tsx
│   │   └── 📁 Valuation
│   │       ├── 🎨 Valuation.module.scss
│   │       └── 📄 Valuation.tsx
│   ├── 📁 styles
│   │   ├── 🎨 global.scss
│   │   ├── 🎨 home.scss
│   │   ├── 🎨 mixins.scss
│   │   └── 🎨 variables.scss
│   ├── 🎨 App.css
│   ├── 📄 App.tsx
│   ├── 🎨 index.css
│   └── 📄 main.tsx
├── ⚙️ .gitignore
├── 📝 README.md
├── 📄 eslint.config.js
├── 🌐 index.html
├── ⚙️ package-lock.json
├── ⚙️ package.json
├── ⚙️ tsconfig.app.json
├── ⚙️ tsconfig.json
├── ⚙️ tsconfig.node.json
└── 📄 vite.config.ts
```


###Running the project
```bash
npm install
npm run dev
```

### Stack
- React
- Typescript
- Vite
- Sass