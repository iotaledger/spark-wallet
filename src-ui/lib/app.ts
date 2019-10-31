import { writable } from 'svelte/store'
import { persistent } from '~/lib/helpers'

/**
 * Notification content
 */
export const notification = writable<string>(null)

/**
 * Dark mode enabled state¬
 */
export const darkMode = persistent<boolean>('darkMode', false)

/**
 * Unset notification timeout
 */
let timeout: NodeJS.Timeout

notification.subscribe((item) => {
    clearTimeout(timeout)
    if (item) {
        timeout = setTimeout(() => {
            notification.set(null)
        }, 2400)
    }
})
