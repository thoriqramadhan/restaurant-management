import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function page() {
    const rootRoute = '/setting'
    const settingsItem = [
        {
            title: 'Account',
            icon: <User/>,
            href: `${rootRoute}/account`
        },
        {
            title: 'Account',
            icon: <User/>,
            href: `${rootRoute}/account`
        },
        {
            title: 'Account',
            icon: <User/>,
            href: `${rootRoute}/account`
        },
        {
            title: 'Account',
            icon: <User/>,
            href: `${rootRoute}/account`
        },
    ]
  return (
    <Card>
        <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Manage your app settings.</CardDescription>
        </CardHeader>
        <CardContent className='w-full grid grid-cols-2 gap-5'>
            {settingsItem.map((item , i) => (
                <Link href={item?.href ?? ''} className="w-full space-x-3 flex rounded-sm items-center hover:bg-slate-500/20 transition-300 px-3 py-2" key={i}>
                    {React.cloneElement(item.icon , {size: 15 })}
                    <p>{item.title}</p>
                </Link>
            ))}
        </CardContent>
    </Card>
  )
}
