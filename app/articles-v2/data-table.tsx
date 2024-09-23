"use client"

import { useState, useMemo } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown, Search } from "lucide-react"

type Article = {
    contentSource: string
    title: string
    url: string
    summary: string
    relevanceRating: number
    date: string
}

const articles: Article[] = [
    {
        "contentSource": "John Doe / Tech Times",
        "title": "The Future of AI: Trends to Watch",
        "url": "https://techtimes.com/future-ai-trends",
        "summary": "An overview of emerging trends in artificial intelligence and how they will shape various industries.",
        "relevanceRating": 4.8,
        "date": "2024-09-18"
    },
    {
        "contentSource": "Jane Smith / Data Digest",
        "title": "Understanding Data Privacy in 2024",
        "url": "https://datadigest.com/data-privacy-2024",
        "summary": "A detailed analysis of the changing landscape of data privacy regulations globally.",
        "relevanceRating": 4.5,
        "date": "2024-09-15"
    },
    {
        "contentSource": "Emily Clarke / Web Developer Daily",
        "title": "Top Web Development Frameworks in 2024",
        "url": "https://webdevdaily.com/top-frameworks-2024",
        "summary": "A comprehensive list of the most popular web development frameworks and their key features.",
        "relevanceRating": 4.9,
        "date": "2024-09-14"
    }
]

export default function DataTableArticles() {
    const [sortColumn, setSortColumn] = useState<keyof Article>('date')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
    const [filter, setFilter] = useState('')
    const [selectedArticles, setSelectedArticles] = useState<string[]>([])

    const handleSort = (column: keyof Article) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortColumn(column)
            setSortDirection('asc')
        }
    }

    const handleSelect = (url: string) => {
        setSelectedArticles(prev =>
            prev.includes(url) ? prev.filter(item => item !== url) : [...prev, url]
        )
    }

    const handleSelectAll = () => {
        if (selectedArticles.length === filteredArticles.length) {
            setSelectedArticles([])
        } else {
            setSelectedArticles(filteredArticles.map(article => article.url))
        }
    }

    const filteredArticles = useMemo(() => {
        return articles.filter(article =>
            Object.values(article).some(value =>
                value.toString().toLowerCase().includes(filter.toLowerCase())
            )
        ).sort((a, b) => {
            if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
            if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
            return 0
        })
    }, [filter, sortColumn, sortDirection])

    return (
        <div className="p-4">
            <div className="mb-4 flex items-center">
                <Input
                    placeholder="Filter articles..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="max-w-sm mr-2"
                />
                <Search className="text-gray-400" />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">
                            <Checkbox
                                checked={selectedArticles.length === filteredArticles.length}
                                onCheckedChange={handleSelectAll}
                            />
                        </TableHead>
                        <TableHead className="w-[200px]">
                            <Button variant="ghost" onClick={() => handleSort('contentSource')}>
                                Content Source
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TableHead>
                        <TableHead className="w-[300px]">
                            <Button variant="ghost" onClick={() => handleSort('title')}>
                                Title
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TableHead>
                        <TableHead>
                            <Button variant="ghost" onClick={() => handleSort('summary')}>
                                Summary
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TableHead>
                        <TableHead className="w-[100px]">
                            <Button variant="ghost" onClick={() => handleSort('relevanceRating')}>
                                Relevance
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TableHead>
                        <TableHead className="w-[100px]">
                            <Button variant="ghost" onClick={() => handleSort('date')}>
                                Date
                                <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredArticles.map((article) => (
                        <TableRow key={article.url}>
                            <TableCell>
                                <Checkbox
                                    checked={selectedArticles.includes(article.url)}
                                    onCheckedChange={() => handleSelect(article.url)}
                                />
                            </TableCell>
                            <TableCell>{article.contentSource}</TableCell>
                            <TableCell>
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    {article.title}
                                </a>
                            </TableCell>
                            <TableCell>{article.summary}</TableCell>
                            <TableCell>{article.relevanceRating}</TableCell>
                            <TableCell>{article.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}