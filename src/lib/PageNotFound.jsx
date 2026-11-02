import { Link, useLocation } from 'react-router-dom';
import SEO from '@/components/SEO';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export default function PageNotFound() {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-background">
            <SEO
                title="Page Not Found"
                description="The page you're looking for could not be found."
                path={location.pathname}
                noindex
            />
            <Navbar />
            <div className="pt-40 pb-32 max-w-7xl mx-auto px-6 md:px-12 text-center">
                <p className="font-sans text-xs tracking-widest uppercase text-primary mb-3">404</p>
                <h1 className="font-serif text-5xl md:text-6xl font-light leading-none mb-6">
                    Page Not Found
                </h1>
                <p className="font-sans text-sm leading-relaxed text-muted-foreground max-w-md mx-auto mb-10">
                    The page you are looking for has moved or no longer exists.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/collection"
                        className="inline-block font-sans text-xs tracking-widest uppercase bg-foreground text-background px-8 py-4 hover:opacity-80 transition-opacity"
                    >
                        View the Collection
                    </Link>
                    <Link
                        to="/"
                        className="inline-block font-sans text-xs tracking-widest uppercase border border-foreground/30 px-8 py-4 hover:bg-foreground hover:text-background transition-colors"
                    >
                        Home
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    )
}
