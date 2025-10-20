import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Church Psychosocial Risk Assessment
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Understanding and improving workplace wellbeing in ministry
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            About This Assessment
          </h2>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              This tool helps churches and Christian organisations identify and address
              psychosocial risks in the workplace. It provides insights into the
              wellbeing of both leaders and staff members.
            </p>
            <p>
              The assessment consists of 30 questions covering nine key areas:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Job Demands & Expectations</li>
              <li>Role Clarity & Organisational Justice</li>
              <li>Control & Autonomy</li>
              <li>Support & Recognition</li>
              <li>Relationships & Harmful Behaviours</li>
              <li>Ministry-Specific Factors</li>
              <li>Trauma & Emotional Demands</li>
              <li>Work-Life Integration</li>
              <li>Trust & Psychological Safety</li>
            </ul>
            <p className="font-semibold">
              Time to complete: Approximately 10-15 minutes
            </p>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-2">
            Your Privacy Matters
          </h3>
          <p className="text-blue-800 dark:text-blue-300">
            Your responses are confidential and will be used only for aggregate analysis.
            Individual responses are not tracked or identifiable. This tool is designed
            to help organisations understand overall patterns and identify areas for improvement.
          </p>
        </div>

        {/* Role Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Select Your Role
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Leader Card */}
            <Link href="/survey/leader">
              <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-xl transition-all cursor-pointer group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors">
                    <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Leader/Manager
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Senior Pastors, Ministry Leaders, Department Heads
                  </p>
                  <div className="text-blue-600 dark:text-blue-400 font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300">
                    Start Assessment →
                  </div>
                </div>
              </div>
            </Link>

            {/* Staff Card */}
            <Link href="/survey/staff">
              <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-green-500 dark:hover:border-green-400 hover:shadow-xl transition-all cursor-pointer group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 dark:group-hover:bg-green-800/40 transition-colors">
                    <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Staff/Team Member
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Non-management staff and team members
                  </p>
                  <div className="text-green-600 dark:text-green-400 font-semibold group-hover:text-green-700 dark:group-hover:text-green-300">
                    Start Assessment →
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Admin Link */}
        <div className="mt-8 text-center">
          <Link
            href="/admin"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 text-sm"
          >
            Admin Dashboard →
          </Link>
        </div>
      </div>
    </div>
  );
}
