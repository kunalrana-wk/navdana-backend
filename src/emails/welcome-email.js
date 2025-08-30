module.exports = function welcomeEmailTemplate(firstName) {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shop Now</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background: #FDF9F8; /* A soft, warm off-white */
        }
        .cursive-title {
            font-family: 'Dancing Script', cursive;
        }
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }
        .animate-pulse-fast {
            animation: pulse 1.5s infinite;
        }
    </style>
</head>
<body class="flex items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 text-[#333333]">
    <div class="max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden transform transition-transform hover:scale-105 duration-300">
        
        <!-- Image Section with a subtle overlay -->
        <div class="relative">
            <img src="https://placehold.co/600x400/FFD1DC/333333?text=Navdana" alt="Navdana" class="w-full h-auto object-cover rounded-t-3xl">
            <div class="absolute inset-0 bg-pink-500 opacity-20 rounded-t-3xl"></div>
        </div>

        <!-- Main Content Section -->
        <div class="p-8 sm:p-10 md:p-12 text-center">
            <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">
                <span class="cursive-title text-pink-600">Step Into Our World.</span>
            </h1>
            <h2 class="text-lg sm:text-xl text-gray-500 mb-6">Welcome to Navdana</h2>

            <p class="text-base sm:text-lg text-gray-700 leading-relaxed max-w-lg mx-auto mb-8">
                Now that you're part of our community, you'll be the first to know about our newest drops, exclusive collections, and special member-only offers.
            </p>

            <!-- Call to Action Button with updated style -->
            <a href="#" class="inline-block px-10 py-4 bg-pink-600 text-white rounded-full font-bold uppercase tracking-wide text-sm sm:text-base transition-all duration-300 hover:bg-pink-700 hover:shadow-2xl animate-pulse-fast">
                EXPLORE THE COLLECTION
            </a>
        </div>
    </div>
</body>
</html>

  `;
};
