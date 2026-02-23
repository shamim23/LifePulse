import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ChevronLeft, ChevronRight, FileText, Calendar } from 'lucide-react';
import type { TestResult } from '@/pages/Dashboard';

interface TestHistoryProps {
  testResults: TestResult[];
  compact?: boolean;
}

export function TestHistory({ testResults, compact = false }: TestHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = compact ? 6 : 10;

  // Filter results
  const filteredResults = testResults.filter(result =>
    result.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort by date (newest first)
  const sortedResults = [...filteredResults].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Pagination
  const totalPages = Math.ceil(sortedResults.length / itemsPerPage);
  const paginatedResults = sortedResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'normal':
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
            Normal
          </Badge>
        );
      case 'high':
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200">
            High
          </Badge>
        );
      case 'low':
        return (
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200">
            Low
          </Badge>
        );
      default:
        return null;
    }
  };

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'normal':
        return <div className="w-2 h-2 rounded-full bg-green-500" />;
      case 'high':
        return <div className="w-2 h-2 rounded-full bg-red-500" />;
      case 'low':
        return <div className="w-2 h-2 rounded-full bg-amber-500" />;
      default:
        return null;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getRelativeTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  if (testResults.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <FileText className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">
          No test results yet
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Upload your first lab report to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      {!compact && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search tests or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      )}

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 dark:bg-slate-900">
              <TableHead className="w-[30px]"></TableHead>
              <TableHead>Test Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead>Date</TableHead>
              {!compact && <TableHead className="text-right">Reference Range</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedResults.map((result) => (
              <TableRow 
                key={result.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-900/50"
              >
                <TableCell>{getStatusIndicator(result.status)}</TableCell>
                <TableCell className="font-medium">{result.testName}</TableCell>
                <TableCell>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {result.category}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <span className="font-semibold">{result.value}</span>
                  <span className="text-sm text-slate-500 ml-1">{result.unit}</span>
                </TableCell>
                <TableCell className="text-center">
                  {getStatusBadge(result.status)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-sm">
                      {compact ? getRelativeTime(result.date) : formatDate(result.date)}
                    </span>
                  </div>
                </TableCell>
                {!compact && (
                  <TableCell className="text-right text-sm text-slate-500">
                    {result.normalRange.min} - {result.normalRange.max} {result.unit}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, sortedResults.length)} of{' '}
            {sortedResults.length} results
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-slate-600">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
