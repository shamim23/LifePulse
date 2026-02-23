import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronLeft, Stethoscope, MoreHorizontal, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Note {
  id: string;
  date: string;
  summary: string;
  sections: {
    title: string;
    content: string;
    links?: { text: string; url: string }[];
  }[];
}

const clinicianNotes: Note[] = [
  {
    id: '1',
    date: 'Aug 3, 2024',
    summary: 'Overall really positive and reassuring findings here. Keep up the good work! I recommend following up to discuss with your local primary care doctor about these results.',
    sections: [
      {
        title: 'Metabolic Health & Heart',
        content: 'No lab findings of metabolic concerns such as diabetes. There are signs of a cholesterol problem (high LDL "bad" cholesterol). This can be due to several causes including diet, genetics, and/or toxin exposure. Lipoprotein (a) was high. Elevated levels of lipoprotein (a) increase your cardiovascular risk.',
        links: [
          { text: 'Lipoprotein (a)', url: '#' },
          { text: 'lipoprotein (a)', url: '#' }
        ]
      },
      {
        title: 'Liver',
        content: 'High ALT and AST. The ALT and AST are liver enzymes that are released into the bloodstream when the liver is injured or inflamed. It is also found in muscle tissue.',
        links: [
          { text: 'ALT', url: '#' },
          { text: 'AST', url: '#' }
        ]
      },
      {
        title: 'Thyroid',
        content: 'Thyroid function appears normal. TSH is within optimal range and free T4/T3 levels are appropriate. Continue current lifestyle factors.',
      },
      {
        title: 'Nutrients',
        content: 'Vitamin D levels are slightly below optimal. Consider increasing sun exposure or supplementation. B12 and folate levels are excellent.',
      }
    ]
  },
  {
    id: '2',
    date: 'May 17, 2024',
    summary: 'Good progress since the last test. LDL cholesterol has decreased by 15 points, likely due to dietary changes. Continue the current approach.',
    sections: [
      {
        title: 'Heart Health',
        content: 'LDL cholesterol showing improvement. Continue with omega-3 supplementation and dietary modifications. Consider adding plant sterols.',
      },
      {
        title: 'Blood Sugar',
        content: 'HbA1c remains stable in the normal range. No signs of insulin resistance or prediabetes at this time.',
      }
    ]
  },
  {
    id: '3',
    date: 'May 1, 2024',
    summary: 'Initial baseline assessment. Several markers require attention, particularly lipid panel and inflammatory markers.',
    sections: [
      {
        title: 'Initial Assessment',
        content: 'This is your first comprehensive panel with us. We have identified several areas for optimization. The action plan has been tailored to address these specific findings.',
      }
    ]
  },
  {
    id: '4',
    date: 'Aug 1, 2023',
    summary: 'Annual follow-up. Overall trends are positive with most biomarkers improving or stable.',
    sections: [
      {
        title: 'Year over Year Comparison',
        content: 'Comparing to last year\'s results, we see a 10% improvement in overall biomarker optimization. Keep up the good work with your current lifestyle interventions.',
      }
    ]
  },
  {
    id: '5',
    date: 'Mar 19, 2023',
    summary: 'Previous year baseline. Establishing initial health markers and identifying priority areas.',
    sections: [
      {
        title: 'Baseline Establishment',
        content: 'Welcome to Function Health. We have completed your first comprehensive biomarker assessment. Your personalized action plan will be ready within 48 hours.',
      }
    ]
  }
];

export default function ClinicianNotes() {
  const [selectedNote, setSelectedNote] = useState<Note>(clinicianNotes[0]);

  return (
    <div className="min-h-screen bg-[#faf9f7] dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Stethoscope className="h-8 w-8 text-teal-600" />
              <h1 className="text-3xl font-serif text-slate-900 dark:text-white">Clinician Notes</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Left Sidebar - Note List */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="space-y-2">
                  {clinicianNotes.map((note) => (
                    <button
                      key={note.id}
                      onClick={() => setSelectedNote(note)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedNote.id === note.id 
                          ? 'bg-teal-50 border border-teal-200' 
                          : 'hover:bg-slate-50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Calendar className={`h-4 w-4 ${
                          selectedNote.id === note.id ? 'text-teal-600' : 'text-slate-400'
                        }`} />
                        <span className={`text-sm font-medium ${
                          selectedNote.id === note.id ? 'text-teal-900' : 'text-slate-700'
                        }`}>
                          {note.date}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Content - Selected Note */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                {/* Note Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-serif text-teal-700 mb-2">{selectedNote.date}</h2>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-teal-600 text-white">Latest</Badge>
                      <span className="text-sm text-slate-500">2 of 9</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5 text-slate-400" />
                  </Button>
                </div>

                {/* Summary */}
                <div className="mb-8">
                  <h3 className="text-xl font-serif text-slate-900 dark:text-white mb-3">Summary</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {selectedNote.summary}
                  </p>
                </div>

                {/* Sections */}
                <div className="space-y-8">
                  {selectedNote.sections.map((section, index) => (
                    <div key={index} className="border-t border-slate-100 dark:border-slate-800 pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-serif text-slate-900 dark:text-white">
                          {section.title}
                        </h3>
                        <Button variant="ghost" size="icon" className="-mt-2">
                          <MoreHorizontal className="h-5 w-5 text-slate-400" />
                        </Button>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {section.content.split(' ').map((word, wordIndex) => {
                          // Check if this word is a linked term
                          const link = section.links?.find(l => word.includes(l.text));
                          if (link) {
                            return (
                              <span key={wordIndex}>
                                <a 
                                  href={link.url}
                                  className="text-teal-700 hover:underline inline-flex items-center gap-0.5"
                                >
                                  {word}
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                                {' '}
                              </span>
                            );
                          }
                          return <span key={wordIndex}>{word} </span>;
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
