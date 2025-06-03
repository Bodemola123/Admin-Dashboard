/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
  	screens: {
  		sm: '480px',
  		md: '768px',
  		lg: '1206px',
  		xl: '1440px'
  	},
  	extend: {
  		colors: {
  			primary: '#46BA3C',
  			secondary: '#F4F4F4',
  			dovegray: '#6d6d6d'
  		},
  		boxShadow: {
  			'1xl': '0px 0px 10px 5px rgba(0,0,0,0.05)',
  			'1blue': '0px 0px 6px 1px rgba(22, 44, 244, 0.668)',
  			'2xl': '0px 0px 10px 5px rgba(0,0,0,0.1)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
    plugins: [
    require("tailwindcss-animate"), // Keep the animate plugin
    function ({ addUtilities }) {
      addUtilities(
        {
          '.scrollbar-hide': {
            'scrollbar-width': 'none', /* Hide scrollbar for Firefox */
          },
          '.scrollbar-hide::-webkit-scrollbar': {
            'display': 'none', /* Hide scrollbar for WebKit browsers */
          },
        },
        ['responsive', 'hover'] // This ensures the utility works with all responsive variants
      );
    },
  ],
};
