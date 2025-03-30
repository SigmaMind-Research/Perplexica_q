/* eslint-disable react/no-unescaped-entities */

"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Edit2, Check, Clock, Eye, ThumbsUp, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { SourceItem } from "@/components/source-item"

export default function BlogPost() {
  const [title, setTitle] = useState("AI Task Capacity Doubles Every 7 Months")
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isEditingImage, setIsEditingImage] = useState(false)
  const [imageUrl, setImageUrl] = useState("/placeholder.svg?height=400&width=800")
  const titleInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const handleTitleClick = () => {
    setIsEditingTitle(true)
    setTimeout(() => {
      titleInputRef.current?.focus()
    }, 0)
  }

  const handleTitleSave = () => {
    setIsEditingTitle(false)
  }

  const handleImageClick = () => {
    setIsEditingImage(true)
    setTimeout(() => {
      // imageInputRef.current?.click()
    }, 0)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // const reader = new FileReader()
      // reader.onload = (event) => {
      //   setImageUrl(event.target?.result as string)
      // }
      // reader.readAsDataURL(file)
    }
    setIsEditingImage(false)
  }

  const sources = [
    { name: "metr", icon: "/icons/metr.svg", url: "#" },
    { name: "arxiv", icon: "/icons/arxiv.svg", url: "#" },
    { name: "github", icon: "/icons/github.svg", url: "#" },
    { name: "medium", icon: "/icons/medium.svg", url: "#" },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 pb-16">
      {/* Header Actions */}
      <div className="sticky top-0 z-10 bg-zinc-50 dark:bg-zinc-900 py-4 flex justify-between items-center">
        <Button variant="ghost" size="icon" className="rounded-full">
          <span className="sr-only">Back</span>
          <ChevronRight className="h-6 w-6 rotate-180" />
        </Button>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <span className="sr-only">Bookmark</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <span className="sr-only">Share</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <span className="sr-only">More</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </Button>
        </div>
      </div>

      {/* Featured Image */}
      <div
        className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-4 cursor-pointer group"
        onClick={handleImageClick}
      >
        <Image src={imageUrl || "/placeholder.svg"} alt="Blog header image" fill className="object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
          <Edit2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8" />
        </div>
        <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          VCG · gettyimages
        </div>
        <input type="file" ref={imageInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
      </div>

      {/* Title */}
      <div className="mb-6">
        {isEditingTitle ? (
          <div className="relative">
            <input
              ref={titleInputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-3xl md:text-4xl lg:text-5xl font-bold py-2 px-3 bg-transparent border-2 border-primary rounded-md focus:outline-none dark:text-white"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={handleTitleSave}
            >
              <Check className="h-6 w-6" />
            </Button>
          </div>
        ) : (
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold cursor-pointer hover:text-primary transition-colors dark:text-white"
            onClick={handleTitleClick}
          >
            {title}
          </h1>
        )}
      </div>

      {/* Content */}
      <div className="prose prose-zinc dark:prose-invert max-w-none mb-8">
        <p className="text-lg">
          According to a study by METR, AI agents' ability to complete tasks has been exponentially increasing, with the
          length of tasks they can handle doubling approximately every 7 months over the past 6 years, potentially
          leading to AI systems capable of automating month-long software projects within 5 years.
        </p>
      </div>

      {/* Author and Stats */}
      <div className="flex items-center justify-between mb-8 border-b border-zinc-200 dark:border-zinc-700 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
            <Image src="/placeholder.svg?height=40&width=40" alt="Author avatar" width={40} height={40} />
          </div>
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Curated by</p>
            <p className="font-medium dark:text-white">dailyed</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
            <Clock className="h-4 w-4" />
            <span className="text-sm">15h</span>
          </div>
          <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
            <Eye className="h-4 w-4" />
            <span className="text-sm">9,006</span>
          </div>
          <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
            <ThumbsUp className="h-4 w-4" />
            <span className="text-sm">388</span>
          </div>
        </div>
      </div>

      {/* Sources */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-lg dark:text-white">Sources</h3>
          <Button variant="ghost" size="sm" className="text-primary">
            View all sources
          </Button>
        </div>
        {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {sources.map((source, index) => (
            <SourceItem key={index} source={source} />
          ))}
        </div> */}
      </div>

      {/* Main Content */}
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <h2>METR Metric for AI</h2>
        <p>
          The METR (Measuring Exponential Task Resolution) metric, introduced by researchers at METR.org, offers a novel
          approach to quantifying AI capabilities. This metric focuses on the "50%-task-completion time horizon," which
          measures the duration of tasks that current AI systems can complete with at least 50% success rate.
        </p>
        <p>
          According to the latest METR report, this metric has been doubling approximately every 7 months since 2018.
          This exponential growth suggests that AI systems that currently struggle with tasks requiring several hours of
          focused work might be capable of completing month-long projects by 2028.
        </p>
        <p>
          The implications of this trend are significant for industries relying on knowledge workers. Software
          development, content creation, and research fields could see dramatic transformations as AI systems become
          capable of handling increasingly complex and lengthy tasks.
        </p>
        <p>
          However, critics argue that the METR methodology may overestimate AI capabilities by focusing on controlled
          environments rather than real-world applications. Additionally, questions remain about whether this
          exponential growth can be sustained as tasks become more complex and require deeper contextual understanding.
        </p>
        <h2>Industry Response</h2>
        <p>
          Tech companies are already positioning themselves to capitalize on this trend. Major cloud providers are
          scaling up their AI infrastructure to support more complex and longer-running AI workloads. Meanwhile,
          startups focused on AI orchestration—managing complex, multi-step AI processes—have seen increased investment.
        </p>
        <p>
          The labor market implications remain uncertain. While some experts predict significant job displacement,
          others argue that human-AI collaboration will create new roles focused on directing and refining AI outputs
          rather than producing them from scratch.
        </p>
      </div>
    </div>
  )
}

