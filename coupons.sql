-- Create coupons table
CREATE TABLE IF NOT EXISTS coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
    discount_value NUMERIC NOT NULL CHECK (discount_value > 0),
    expiry_date TIMESTAMP WITH TIME ZONE,
    usage_limit INTEGER,
    used_count INTEGER DEFAULT 0,
    applicable_course_ids TEXT[], -- Array of strings (course names) or NULL for all courses
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

-- Allow all read access (since validation checks it)
CREATE POLICY "Allow public read access on coupons" 
ON coupons FOR SELECT 
TO public
USING (true);

-- Allow all update access (for admin dashboard & increments)
CREATE POLICY "Allow public all access on coupons for admin dashboard" 
ON coupons FOR ALL 
TO public
USING (true)
WITH CHECK (true);

-- Add applied_coupon to student_registrations if it doesn't exist
ALTER TABLE student_registrations ADD COLUMN IF NOT EXISTS applied_coupon VARCHAR(50);

