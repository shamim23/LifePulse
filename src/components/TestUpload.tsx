import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, File, X, Loader2 } from 'lucide-react';
import type { TestResult } from '@/pages/Dashboard';

interface TestUploadProps {
  onUploadComplete: (results: TestResult[]) => void;
}

export function TestUpload({ onUploadComplete }: TestUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const simulateUpload = async () => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setUploadProgress(i);
    }

    // Simulate extracted results
    const mockResults: TestResult[] = [
      {
        id: Date.now().toString(),
        testName: 'Blood Glucose',
        value: Math.floor(Math.random() * 40) + 80,
        unit: 'mg/dL',
        normalRange: { min: 70, max: 100 },
        date: new Date().toISOString().split('T')[0],
        status: 'normal',
        category: 'Blood Sugar',
        description: 'Extracted from uploaded report'
      },
      {
        id: (Date.now() + 1).toString(),
        testName: 'Total Cholesterol',
        value: Math.floor(Math.random() * 50) + 170,
        unit: 'mg/dL',
        normalRange: { min: 0, max: 200 },
        date: new Date().toISOString().split('T')[0],
        status: 'normal',
        category: 'Lipid Profile',
        description: 'Extracted from uploaded report'
      },
      {
        id: (Date.now() + 2).toString(),
        testName: 'HDL Cholesterol',
        value: Math.floor(Math.random() * 20) + 45,
        unit: 'mg/dL',
        normalRange: { min: 40, max: 200 },
        date: new Date().toISOString().split('T')[0],
        status: 'normal',
        category: 'Lipid Profile',
        description: 'Extracted from uploaded report'
      }
    ];

    setIsUploading(false);
    onUploadComplete(mockResults);
    setFiles([]);
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
          ${isDragging 
            ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/20' 
            : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600'
          }
        `}
      >
        <input
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="space-y-3">
          <div className="mx-auto w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
            <Upload className="h-6 w-6 text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              Drop your files here, or click to browse
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Supports PDF, JPG, PNG (max 10MB each)
            </p>
          </div>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <Card key={index} className="bg-slate-50 dark:bg-slate-900">
              <CardContent className="py-3 px-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
                      <File className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  {!isUploading && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Upload Progress */}
      {isUploading && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Processing your files... {uploadProgress}%</span>
          </div>
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-teal-600 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Extracting test values using AI...
          </p>
        </div>
      )}

      {/* Actions */}
      {files.length > 0 && !isUploading && (
        <div className="flex gap-2">
          <Button 
            onClick={simulateUpload} 
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
          >
            <Upload className="h-4 w-4 mr-2" />
            Process {files.length} file{files.length > 1 ? 's' : ''}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setFiles([])}
          >
            Clear
          </Button>
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 text-sm">
        <p className="font-medium text-blue-900 dark:text-blue-300 mb-1">
          💡 Tips for best results:
        </p>
        <ul className="text-blue-800 dark:text-blue-400 space-y-1 list-disc list-inside">
          <li>Ensure the report is clearly visible and not blurry</li>
          <li>Make sure all text is readable</li>
          <li>PDF files work best for extraction</li>
        </ul>
      </div>
    </div>
  );
}
