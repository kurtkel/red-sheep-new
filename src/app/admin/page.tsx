'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { OverallAnalysis } from '@/lib/analysis';

export default function AdminPage() {
  const [analysis, setAnalysis] = useState<OverallAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'overview' | 'sections' | 'questions'>('overview');

  useEffect(() => {
    fetchAnalysis();
  }, []);

  const fetchAnalysis = async () => {
    try {
      const response = await fetch('/api/analysis');
      const data = await response.json();
      setAnalysis(data);
    } catch (error) {
      console.error('Error fetching analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = async () => {
    try {
      const response = await fetch('/api/export');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `survey-results-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Error exporting data');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-xl text-gray-600 dark:text-gray-400">Loading analysis...</div>
      </div>
    );
  }

  if (!analysis || analysis.totalResponses === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Admin Dashboard
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              No survey responses yet. Share the assessment with your team to get started.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Go to Assessment
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const sectionChartData = analysis.sectionAnalyses.map(section => ({
    name: section.sectionName.substring(0, 20) + (section.sectionName.length > 20 ? '...' : ''),
    fullName: section.sectionName,
    Leader: Number(section.leaderMean.toFixed(2)),
    Staff: Number(section.staffMean.toFixed(2)),
    Gap: Number(section.gap.toFixed(2)),
  }));

  const topRisks = analysis.questionAnalyses
    .filter(q => q.riskLevel === 'high' || q.riskLevel === 'moderate')
    .sort((a, b) => {
      if (a.riskLevel === 'high' && b.riskLevel !== 'high') return -1;
      if (a.riskLevel !== 'high' && b.riskLevel === 'high') return 1;
      return Math.abs(b.gap) - Math.abs(a.gap);
    })
    .slice(0, 10);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <div className="flex gap-4">
              <button
                onClick={exportToCSV}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Export CSV
              </button>
              <Link
                href="/"
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Home
              </Link>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2 bg-white dark:bg-gray-800 rounded-lg p-1 inline-flex">
            <button
              onClick={() => setView('overview')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                view === 'overview'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setView('sections')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                view === 'sections'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              By Section
            </button>
            <button
              onClick={() => setView('questions')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                view === 'questions'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              All Questions
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        {view === 'overview' && (
          <>
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  Total Responses
                </h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {Math.round(analysis.leaderResponses + analysis.staffResponses)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {Math.round(analysis.leaderResponses)} leaders, {Math.round(analysis.staffResponses)} staff
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  Overall Gap
                </h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {analysis.overallGap.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Leader: {analysis.overallLeaderMean.toFixed(2)} | Staff: {analysis.overallStaffMean.toFixed(2)}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">
                  High Risk Areas
                </h3>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                  {analysis.highRiskCount}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Require immediate attention
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-sm font-semibold text-yellow-600 dark:text-yellow-400 mb-2">
                  Moderate Risk Areas
                </h3>
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                  {analysis.moderateRiskCount}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Monitor and improve
                </p>
              </div>
            </div>

            {/* Section Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Comparison by Section
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={sectionChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis domain={[0, 7]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Leader" fill="#3b82f6" />
                  <Bar dataKey="Staff" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Top Risks */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Top Priority Areas
              </h2>
              <div className="space-y-4">
                {topRisks.map((question, index) => (
                  <div
                    key={question.questionNumber}
                    className={`p-4 rounded-lg border-2 ${
                      question.riskLevel === 'high'
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        #{index + 1} - Question {question.questionNumber}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          question.riskLevel === 'high'
                            ? 'bg-red-500 text-white'
                            : 'bg-yellow-500 text-white'
                        }`}
                      >
                        {question.riskLevel.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      {question.questionText.staff}
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Leader Mean:</span>
                        <span className="ml-2 font-semibold text-blue-600 dark:text-blue-400">
                          {question.leaderMean.toFixed(2)}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Staff Mean:</span>
                        <span className="ml-2 font-semibold text-green-600 dark:text-green-400">
                          {question.staffMean.toFixed(2)}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Gap:</span>
                        <span className="ml-2 font-semibold text-red-600 dark:text-red-400">
                          {question.gap.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Sections View */}
        {view === 'sections' && (
          <div className="space-y-6">
            {analysis.sectionAnalyses.map((section) => (
              <div key={section.sectionName} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Section {section.sectionNumber}: {section.sectionName}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {section.questionCount} questions
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      section.riskLevel === 'high'
                        ? 'bg-red-500 text-white'
                        : section.riskLevel === 'moderate'
                        ? 'bg-yellow-500 text-white'
                        : 'bg-green-500 text-white'
                    }`}
                  >
                    {section.riskLevel.toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Leader Mean</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {section.leaderMean.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Staff Mean</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {section.staffMean.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Gap</p>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {section.gap.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Questions View */}
        {view === 'questions' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              All Questions Analysis
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Q#
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Section
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Leader
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Staff
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Gap
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Risk
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {analysis.questionAnalyses.map((question) => (
                    <tr key={question.questionNumber} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {question.questionNumber}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                        {question.sectionName}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-600 dark:text-blue-400 font-semibold">
                        {question.leaderMean.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600 dark:text-green-400 font-semibold">
                        {question.staffMean.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600 dark:text-red-400 font-semibold">
                        {question.gap.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            question.riskLevel === 'high'
                              ? 'bg-red-500 text-white'
                              : question.riskLevel === 'moderate'
                              ? 'bg-yellow-500 text-white'
                              : 'bg-green-500 text-white'
                          }`}
                        >
                          {question.riskLevel}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
