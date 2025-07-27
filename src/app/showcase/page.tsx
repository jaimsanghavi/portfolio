"use client";

import { useState } from "react";
import { 
  Sun, Moon01, Star01, Check, X, Plus, SearchLg, Settings01, 
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight
} from "@untitledui/icons";
import { useTheme } from "next-themes";

// Import Base Components
import { Button } from "@/components/base/buttons/button";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Badge } from "@/components/base/badges/badges";
import { Avatar } from "@/components/base/avatar/avatar";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Toggle } from "@/components/base/toggle/toggle";
import { Slider } from "@/components/base/slider/slider";
import { ProgressBar } from "@/components/base/progress-indicators/progress-indicators";

export default function Showcase() {
  const { theme, setTheme } = useTheme();
  const [sliderValue, setSliderValue] = useState(50);
  const [toggleState, setToggleState] = useState(false);

  return (
    <div className="min-h-screen bg-gray-25 dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Untitled UI Basic Components
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Essential UI building blocks for any application
          </p>
          
          {/* Theme Toggle */}
          <div className="inline-flex items-center space-x-2 p-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setTheme("light")}
              className={`p-2 rounded-md transition-colors ${
                theme === "light" 
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" 
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              <Sun className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`p-2 rounded-md transition-colors ${
                theme === "dark" 
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" 
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              <Moon01 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Buttons Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Buttons</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Primary Buttons</h3>
                <div className="flex flex-wrap gap-3">
                  <Button color="primary" size="sm" iconLeading={<Plus />}>Small</Button>
                  <Button color="primary" size="md" iconLeading={<Plus />}>Medium</Button>
                  <Button color="primary" size="lg" iconLeading={<Plus />}>Large</Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Secondary Buttons</h3>
                <div className="flex flex-wrap gap-3">
                  <Button color="secondary" size="md" iconLeading={<Settings01 />}>Secondary</Button>
                  <Button color="tertiary" size="md" iconLeading={<SearchLg />}>Tertiary</Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Destructive Buttons</h3>
                <div className="flex flex-wrap gap-3">
                  <Button color="primary-destructive" size="md" iconLeading={<X />}>Delete</Button>
                  <Button color="secondary-destructive" size="md" iconLeading={<X />}>Remove</Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Icon Only</h3>
                <div className="flex flex-wrap gap-3">
                  <Button color="primary" size="md" iconLeading={<Plus />} />
                  <Button color="secondary" size="md" iconLeading={<Settings01 />} />
                  <Button color="tertiary" size="md" iconLeading={<SearchLg />} />
                </div>
              </div>
            </div>
          </div>

          {/* Button Groups */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Button Groups</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Basic Group</h3>
                <ButtonGroup>
                  <ButtonGroupItem>All</ButtonGroupItem>
                  <ButtonGroupItem>Active</ButtonGroupItem>
                  <ButtonGroupItem>Inactive</ButtonGroupItem>
                </ButtonGroup>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Navigation</h3>
                <ButtonGroup>
                  <ButtonGroupItem><ChevronLeft className="w-4 h-4" /></ButtonGroupItem>
                  <ButtonGroupItem>1</ButtonGroupItem>
                  <ButtonGroupItem>2</ButtonGroupItem>
                  <ButtonGroupItem>3</ButtonGroupItem>
                  <ButtonGroupItem><ChevronRight className="w-4 h-4" /></ButtonGroupItem>
                </ButtonGroup>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Badges</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Colors</h3>
                <div className="flex flex-wrap gap-3">
                  <Badge color="gray">Gray</Badge>
                  <Badge color="brand">Brand</Badge>
                  <Badge color="error">Error</Badge>
                  <Badge color="warning">Warning</Badge>
                  <Badge color="success">Success</Badge>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Sizes</h3>
                <div className="flex items-center gap-3">
                  <Badge size="sm">Small</Badge>
                  <Badge size="md">Medium</Badge>
                  <Badge size="lg">Large</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Avatars */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Avatars</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Sizes</h3>
                <div className="flex items-end gap-3">
                  <Avatar size="xs" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
                  <Avatar size="sm" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" />
                  <Avatar size="md" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face" />
                  <Avatar size="lg" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=56&h=56&fit=crop&crop=face" />
                  <Avatar size="xl" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face" />
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Initials & Status</h3>
                <div className="flex items-center gap-3">
                  <Avatar size="md" />
                  <Avatar size="md" initials="JD" />
                  <Avatar size="md" initials="AB" status="online" />
                  <Avatar size="md" src="https://images.unsplash.com/photo-1494790108755-2616b612e6ce?w=48&h=48&fit=crop&crop=face" status="offline" />
                </div>
              </div>
            </div>
          </div>

          {/* Form Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Form Controls</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Inputs</h3>
                <div className="space-y-3">
                  <Input placeholder="Email address" type="email" />
                  <Input placeholder="Search" icon={SearchLg} />
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Text Area</h3>
                <TextArea placeholder="Write your message..." rows={3} />
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Checkboxes</h3>
                <div className="space-y-2">
                  <Checkbox>Send email notifications</Checkbox>
                  <Checkbox defaultSelected>Send SMS notifications</Checkbox>
                </div>
              </div>
            </div>
          </div>

          {/* Toggles & Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Interactive Controls</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Toggle Switch</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-900 dark:text-white">Enable notifications</span>
                  <Toggle isSelected={toggleState} onChange={setToggleState} />
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Slider</h3>
                <div>
                  <label className="text-sm text-gray-900 dark:text-white mb-2 block">
                    Value: {sliderValue}%
                  </label>
                  <Slider 
                    value={[sliderValue]} 
                    onChange={(value) => {
                      const newValue = Array.isArray(value) ? value[0] : value;
                      setSliderValue(newValue);
                    }} 
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Progress Bars</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-900 dark:text-white">Storage</span>
                      <span className="text-gray-500 dark:text-gray-400">75%</span>
                    </div>
                    <ProgressBar value={75} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-900 dark:text-white">Upload</span>
                      <span className="text-gray-500 dark:text-gray-400">45%</span>
                    </div>
                    <ProgressBar value={45} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">
            Built with{" "}
            <a 
              href="https://www.untitledui.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              Untitled UI
            </a>
            {" "}and Next.js
          </p>
        </div>
      </div>
    </div>
  );
}
