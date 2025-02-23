'use client';
import { Button } from '@heroui/button';
import { Input, Textarea } from '@heroui/input';
import { Select, SelectItem } from '@heroui/select';
import { Switch } from '@heroui/switch';
import { useActionState, useState } from 'react';
import { FaGlobe, FaLock } from 'react-icons/fa';
import { createEventAction } from './action';
import Image from 'next/image';

export const categories = [
  { key: 'education', label: 'Education' },
  { key: 'entertainment', label: 'Entertainment' },
  { key: 'music', label: 'Music' },
  { key: 'sports', label: 'Sports' },
  { key: 'other', label: 'Other' },
];

export default function Page() {
  const [state, formAction, pending] = useActionState(createEventAction, null);
  const [isPublished, setIsPublished] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full overflow-hidden">
        <form action={formAction} className="flex w-full">
          {/* Left Section - Image */}
          <div className="w-1/3 bg-gray-50 p-4">
            <Image
              src="/image-template.png"
              alt="image template"
              width={256}
              height={256}
            />
            <Input name="image" type="file" />
          </div>

          {/* Right Section - Form */}
          <div className="w-2/3 p-6 space-y-5">
            {/* Header */}
            <div className="flex justify-between items-center gap-4">
              <Input name="title" variant="underlined" label="Event name" />
              <Switch
                name="published"
                isSelected={isPublished}
                onValueChange={setIsPublished}
                thumbIcon={({ isSelected, className }) =>
                  isSelected ? (
                    <FaGlobe className={className} />
                  ) : (
                    <FaLock className={className} />
                  )
                }
              >
                Published
              </Switch>
            </div>
            {/* Description */}
            <Textarea
              name="description"
              className="max-w"
              label="Description"
              labelPlacement="outside"
              variant="underlined"
              placeholder="Enter your description"
            />
            {/* Datetime */}
            <div>
              <label className="text-sm">Date</label>
              <Input
                name="datetime"
                type="datetime-local"
                variant="underlined"
              />
            </div>
            {/* Location */}
            <div>
              <label className="text-sm">Location</label>
              <Input
                name="location"
                placeholder="Input your location"
                variant="underlined"
              />
            </div>
            {/* Category */}
            <div>
              <label className="text-sm">Category</label>
              <Select
                name="category"
                className="max-w"
                variant="underlined"
                aria-label="Select a category"
                placeholder="Select a category"
              >
                {categories.map((category) => (
                  <SelectItem key={category.key}>{category.label}</SelectItem>
                ))}
              </Select>
            </div>
            {/* Create Event Button */}
            {state?.status === 'error' && (
              <div className="text-center text-rose-600 bg-rose-50 p-2 rounded-lg">
                {state.message}
              </div>
            )}
            {state?.status === 'success' && (
              <div className="text-center text-emerald-600 bg-emerald-50 p-2 rounded-lg">
                {state.message}
              </div>
            )}

            <Button
              isDisabled={pending}
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              {pending ? 'Creating...' : 'Create Event'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
