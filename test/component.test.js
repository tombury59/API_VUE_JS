// @vitest-environment jsdom

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import Header from '../src/components/Header.vue'

// Mock router - utiliser createMemoryHistory pour les tests
const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        { path: '/', component: { template: '<div>Home</div>' } },
        { path: '/catalogue', component: { template: '<div>Catalogue</div>' } }
    ]
})

// Mock localStorage pour l'environnement de test
const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
})

describe('Header Component', () => {
    let wrapper

    beforeEach(() => {
        // Clear localStorage mocks before each test
        vi.clearAllMocks()
        localStorageMock.getItem.mockReturnValue(null)
        
        wrapper = mount(Header, {
            props: {
                activeLink: 'home',
                cartCount: 3
            },
            global: {
                plugins: [router]
            }
        })
    })

    it('renders properly with default props', () => {
        expect(wrapper.find('header').exists()).toBe(true)
        expect(wrapper.text()).toContain('Open Fashion')
    })

    it('displays correct cart count', () => {
        expect(wrapper.find('.absolute').text()).toBe('3')
    })

    it('shows login button when not authenticated', () => {
        // Le bouton LOGIN se trouve dans le template v-else
        const buttons = wrapper.findAll('button')
        const loginButton = buttons.find(btn => btn.text().includes('LOGIN'))
        expect(loginButton).toBeTruthy()
        expect(wrapper.text()).not.toContain('LOGOUT')
    })

    it('shows logout button and username when authenticated', async () => {
        localStorageMock.getItem.mockImplementation((key) => {
            if (key === 'token') return 'fake-token'
            if (key === 'username') return 'testuser'
            return null
        })
        
        await wrapper.vm.checkAuth()
        await wrapper.vm.$nextTick()

        expect(wrapper.text()).toContain('testuser')
        expect(wrapper.text()).toContain('LOGOUT')
    })

    it('toggles mobile menu correctly', async () => {
        const burgerButton = wrapper.find('button[aria-label="Toggle navigation"]')
        
        expect(wrapper.vm.menuOpen).toBe(false)
        
        await burgerButton.trigger('click')
        expect(wrapper.vm.menuOpen).toBe(true)
        
        await burgerButton.trigger('click')
        expect(wrapper.vm.menuOpen).toBe(false)
    })

    it('emits set-active event when navigation link is clicked', async () => {
        const homeLink = wrapper.find('a[href="/"]')
        
        if (homeLink.exists()) {
            await homeLink.trigger('click')
            expect(wrapper.emitted('set-active')).toBeTruthy()
            expect(wrapper.emitted('set-active')[0]).toEqual(['home'])
        }
    })

    it('emits toggle-cart event when cart icon is clicked', async () => {
        const cartIcon = wrapper.find('.relative.cursor-pointer')
        await cartIcon.trigger('click')
        
        expect(wrapper.emitted('toggle-cart')).toBeTruthy()
    })

    it('emits open-login event when login button is clicked', async () => {
        const buttons = wrapper.findAll('button')
        const loginButton = buttons.find(btn => btn.text().includes('LOGIN'))
        
        if (loginButton) {
            await loginButton.trigger('click')
            expect(wrapper.emitted('open-login')).toBeTruthy()
        }
    })


    it('closes mobile menu when navigation link is clicked', async () => {
        // Open menu first
        wrapper.vm.menuOpen = true
        await wrapper.vm.$nextTick()
        
        const homeLink = wrapper.find('a[href="/"]')
        if (homeLink.exists()) {
            await homeLink.trigger('click')
            expect(wrapper.vm.menuOpen).toBe(false)
        }
    })

    it('listens to storage events for auth updates', async () => {
        // Le listener est ajouté dans onMounted, pas besoin de spy
        // Tester directement l'événement storage
        localStorageMock.getItem.mockImplementation((key) => {
            if (key === 'token') return 'new-token'
            if (key === 'username') return 'newuser'
            return null
        })

        // Dispatch storage event
        window.dispatchEvent(new Event('storage'))
        
        // Attendre que l'événement soit traité
        await wrapper.vm.$nextTick()
        
        // Vérifier que l'état a été mis à jour
        expect(wrapper.vm.isLoggedIn).toBe(true)
        expect(wrapper.vm.username).toBe('newuser')
    })
})