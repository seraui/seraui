'use client'

export default function TeamMember3() {
  return (
    <section className="py-24 bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="font-manrope text-5xl text-center font-bold text-gray-900 dark:text-white">Our team</h2>
        </div>
        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-6 lg:grid-cols-5 gap-8 max-w-xl mx-auto md:max-w-3xl lg:max-w-full">
          <div className="block group md:col-span-2 lg:col-span-1">
            <div className="relative mb-6">
              <img
                src="https://pagedone.io/asset/uploads/1696238374.png"
                alt="Antonio image"
                className="w-40 h-40 rounded-full mx-auto transition-all duration-500 object-cover border border-solid border-transparent group-hover:border-indigo-600 dark:group-hover:border-indigo-400"
              />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 capitalize text-center transition-all duration-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              Antonio Roberto
            </h4>
            <span className="text-gray-500 dark:text-gray-400 text-center block transition-all duration-500 group-hover:text-gray-900 dark:group-hover:text-gray-100">
              Founder
            </span>
          </div>

          <div className="block group md:col-span-2 lg:col-span-1">
            <div className="relative mb-6">
              <img
                src="https://pagedone.io/asset/uploads/1696238396.png"
                alt="Patricia image"
                className="w-40 h-40 rounded-full mx-auto transition-all duration-500 object-cover border border-solid border-transparent group-hover:border-indigo-600 dark:group-hover:border-indigo-400"
              />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 capitalize text-center transition-all duration-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              Patricia Angely
            </h4>
            <span className="text-gray-500 dark:text-gray-400 text-center block transition-all duration-500 group-hover:text-gray-900 dark:group-hover:text-gray-100">
              Co-Founder
            </span>
          </div>

          <div className="block group md:col-span-2 lg:col-span-1">
            <div className="relative mb-6">
              <img
                src="https://pagedone.io/asset/uploads/1696238411.png"
                alt="Jerom image"
                className="w-40 h-40 rounded-full mx-auto transition-all duration-500 object-cover border border-solid border-transparent group-hover:border-indigo-600 dark:group-hover:border-indigo-400"
              />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 capitalize text-center transition-all duration-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              Jerom Bell
            </h4>
            <span className="text-gray-500 dark:text-gray-400 text-center block transition-all duration-500 group-hover:text-gray-900 dark:group-hover:text-gray-100">
              Chairman
            </span>
          </div>

          <div className="block group md:col-span-2 lg:col-span-1 md:col-start-2 lg:col-start-4">
            <div className="relative mb-6">
              <img
                src="https://pagedone.io/asset/uploads/1696238425.png"
                alt="Yasmine image"
                className="w-40 h-40 rounded-full mx-auto transition-all duration-500 object-cover border border-solid border-transparent group-hover:border-indigo-600 dark:group-hover:border-indigo-400"
              />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 capitalize text-center transition-all duration-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              Yasmine Tano
            </h4>
            <span className="text-gray-500 dark:text-gray-400 text-center block transition-all duration-500 group-hover:text-gray-900 dark:group-hover:text-gray-100">
              CEO
            </span>
          </div>

          <div className="block group min-[500px]:col-span-2 mx-auto md:col-span-2 lg:col-span-1">
            <div className="relative mb-6">
              <img
                src="https://pagedone.io/asset/uploads/1696238446.png"
                alt="Martin image"
                className="w-40 h-40 rounded-full mx-auto transition-all duration-500 object-cover border border-solid border-transparent group-hover:border-indigo-600 dark:group-hover:border-indigo-400"
              />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 capitalize text-center transition-all duration-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              Martin Darbys
            </h4>
            <span className="text-gray-500 dark:text-gray-400 text-center block transition-all duration-500 group-hover:text-gray-900 dark:group-hover:text-gray-100">
              Product Manager
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
