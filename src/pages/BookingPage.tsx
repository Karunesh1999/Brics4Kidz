import React, { useState } from 'react';
import { 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Printer,
  QrCode,
  School,
  Trees,
  Cake
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/Select';
import confetti from 'canvas-confetti';
import { SCHEDULES, PARTY_PACKAGES, CAMPS } from '../data/mockData';

export const BookingPage: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  
  // Form selections
  const [serviceType, setServiceType] = useState<'after-school' | 'camps' | 'party'>('camps');
  const [selectedItemId, setSelectedItemId] = useState<string>('camp-1');
  const [selectedLocation, setSelectedLocation] = useState<string>('215 Gothic Ct Suite 102, Franklin');
  const [selectedDate, setSelectedDate] = useState<string>('Dec 21 – Dec 24, 2026');
  
  // Attendee info
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('7');
  
  // Addons
  const [partyTheme, setPartyTheme] = useState('Minecraft Block World');
  const [includeVenue, setIncludeVenue] = useState(false);
  const [includeExtraTshirt, setIncludeExtraTshirt] = useState(false);
  
  // Checkout simulation
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Compute pricing
  let basePrice = 279;
  let itemTitle = 'Winter LEGO® Camp | Dec 21–24';

  if (serviceType === 'after-school') {
    const sch = SCHEDULES.find((s) => s.id === selectedItemId) || SCHEDULES[0];
    basePrice = sch.priceNumber;
    itemTitle = sch.title;
  } else if (serviceType === 'party') {
    const pkg = PARTY_PACKAGES.find((p) => p.id === selectedItemId) || PARTY_PACKAGES[1];
    basePrice = pkg.priceNumber;
    itemTitle = `${pkg.name} (${partyTheme})`;
  } else {
    const cmp = CAMPS.find((c) => c.id === selectedItemId) || CAMPS[0];
    basePrice = cmp.priceNumber;
    itemTitle = cmp.title;
  }

  const addonsTotal = (includeVenue ? 120 : 0) + (includeExtraTshirt ? 18 : 0);
  const grandTotal = basePrice + addonsTotal;

  const handleNextStep = () => {
    setStep((prev) => Math.min(prev + 1, 4));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsConfirmed(true);
      setStep(5);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-gutter-lg pt-gutter-md pb-12">
      
      {/* Workflow Step Tracker */}
      {!isConfirmed && (
        <section className="rounded-2xl bg-card border border-border p-4 shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between text-label-sm font-headline font-bold text-muted-foreground">
            <span>Step {step} of 4</span>
            <span className="text-primary">
              {step === 1 && 'Select Program'}
              {step === 2 && 'Schedule & Location'}
              {step === 3 && 'Child & Parent Info'}
              {step === 4 && 'Review & Stripe Checkout'}
            </span>
          </div>

          <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </section>
      )}

      {/* STEP 1: Select Program / Category */}
      {step === 1 && (
        <section className="flex flex-col gap-gutter-md animate-in fade-in">
          <div>
            <h1 className="font-headline text-headline-lg text-foreground font-bold leading-tight">
              What are you enrolling in?
            </h1>
            <p className="font-body text-body-sm text-muted-foreground mt-1">
              Choose from our seasonal camps, after-school enrichment, or birthday party celebrations.
            </p>
          </div>

          {/* Service Category Switcher */}
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => {
                setServiceType('camps');
                setSelectedItemId('camp-1');
              }}
              className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-center ${
                serviceType === 'camps'
                  ? 'border-secondary bg-secondary/10 text-secondary font-bold shadow-sm'
                  : 'border-border bg-card text-foreground hover:bg-surface-low'
              }`}
            >
              <Trees size={22} className={serviceType === 'camps' ? 'text-secondary' : 'text-muted-foreground'} />
              <span className="text-label-sm">Camps</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setServiceType('after-school');
                setSelectedItemId('sch-1');
              }}
              className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-center ${
                serviceType === 'after-school'
                  ? 'border-primary bg-primary/10 text-primary font-bold shadow-sm'
                  : 'border-border bg-card text-foreground hover:bg-surface-low'
              }`}
            >
              <School size={22} className={serviceType === 'after-school' ? 'text-primary' : 'text-muted-foreground'} />
              <span className="text-label-sm">After School</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setServiceType('party');
                setSelectedItemId('pkg-supreme');
              }}
              className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-center ${
                serviceType === 'party'
                  ? 'border-destructive bg-destructive/10 text-destructive font-bold shadow-sm'
                  : 'border-border bg-card text-foreground hover:bg-surface-low'
              }`}
            >
              <Cake size={22} className={serviceType === 'party' ? 'text-destructive' : 'text-muted-foreground'} />
              <span className="text-label-sm">Birthday</span>
            </button>
          </div>

          {/* Option list according to Category */}
          <div className="flex flex-col gap-2.5">
            {serviceType === 'camps' &&
              CAMPS.map((camp) => (
                <Card
                  key={camp.id}
                  variant="interactive"
                  onClick={() => {
                    setSelectedItemId(camp.id);
                    setSelectedLocation(camp.location);
                  }}
                  className={`border-2 p-3.5 transition-all ${
                    selectedItemId === camp.id ? 'border-secondary bg-secondary/5' : 'border-border'
                  }`}
                >
                  <div className="flex flex-col gap-1 w-full">
                    {/* Top Row: Badge & Price */}
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="secondary" className="self-start">{camp.track}</Badge>
                      <span className="font-headline text-sm sm:text-base text-primary font-bold shrink-0">
                        {camp.price}
                      </span>
                    </div>

                    {/* Middle Row: Title */}
                    <h3 className="font-headline text-sm sm:text-base text-foreground font-bold leading-snug mt-1">
                      {camp.title}
                    </h3>

                    {/* Bottom Row: Time & Location */}
                    <p className="font-body text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {camp.time} • {camp.location}
                    </p>
                  </div>
                </Card>
              ))}

            {serviceType === 'after-school' &&
              SCHEDULES.map((sch) => (
                <Card
                  key={sch.id}
                  variant="interactive"
                  onClick={() => {
                    setSelectedItemId(sch.id);
                    setSelectedLocation(sch.location);
                    setSelectedDate(sch.dates);
                  }}
                  className={`border-2 p-3.5 transition-all ${
                    selectedItemId === sch.id ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                >
                  <div className="flex flex-col gap-1 w-full">
                    {/* Top Row: Badge & Price */}
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="primary" className="self-start">{sch.categoryLabel}</Badge>
                      <span className="font-headline text-sm sm:text-base text-primary font-bold shrink-0">
                        {sch.price}
                      </span>
                    </div>

                    {/* Middle Row: Title */}
                    <h3 className="font-headline text-sm sm:text-base text-foreground font-bold leading-snug mt-1">
                      {sch.title}
                    </h3>

                    {/* Bottom Row: Dates & Location */}
                    <p className="font-body text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {sch.dates} • {sch.location}
                    </p>
                  </div>
                </Card>
              ))}

            {serviceType === 'party' &&
              PARTY_PACKAGES.map((pkg) => (
                <Card
                  key={pkg.id}
                  variant="interactive"
                  onClick={() => setSelectedItemId(pkg.id)}
                  className={`border-2 p-3.5 transition-all ${
                    selectedItemId === pkg.id ? 'border-destructive bg-destructive/5' : 'border-border'
                  }`}
                >
                  <div className="flex flex-col gap-1 w-full">
                    {/* Top Row: Badge & Price */}
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant={pkg.isPopular ? 'accent' : 'default'} className="self-start">
                        {pkg.guests} • {pkg.duration}
                      </Badge>
                      <span className="font-headline text-sm sm:text-base text-primary font-bold shrink-0">
                        {pkg.price}
                      </span>
                    </div>

                    {/* Middle Row: Title */}
                    <h3 className="font-headline text-sm sm:text-base text-foreground font-bold leading-snug mt-1">
                      {pkg.name}
                    </h3>

                    {/* Bottom Row: Description */}
                    <p className="font-body text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {pkg.description}
                    </p>
                  </div>
                </Card>
              ))}
          </div>

          <Button variant="primary" size="lg" onClick={handleNextStep} className="w-full gap-2 shadow-md">
            <span>Continue to Schedule</span>
            <ArrowRight size={16} />
          </Button>
        </section>
      )}

      {/* STEP 2: Schedule & Location Picker */}
      {step === 2 && (
        <section className="flex flex-col gap-gutter-md animate-in fade-in">
          <div>
            <h1 className="font-headline text-headline-lg text-foreground font-bold leading-tight">
              Dates & Location
            </h1>
            <p className="font-body text-body-sm text-muted-foreground mt-1">
              Select where and when you would like your child to attend.
            </p>
          </div>

          <Card className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <span className="font-headline text-label-sm text-foreground font-bold">Select Campus Location</span>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="215 Gothic Ct Suite 102, Franklin">215 Gothic Ct Suite 102, Franklin (Main Center)</SelectItem>
                  <SelectItem value="Franklin Classical School">Franklin Classical School (On-campus)</SelectItem>
                  <SelectItem value="Vine Christian Academy">Vine Christian Academy (Lifepoint Church)</SelectItem>
                  <SelectItem value="My Home (Franklin / Brentwood / Nashville)">Client Home (Franklin / Brentwood)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="font-headline text-label-sm text-foreground font-bold">Preferred Date or Session</span>
              <input
                type="text"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                placeholder="e.g. Dec 21–24 or Sat Nov 14 at 2pm"
                className="w-full rounded-xl bg-card border border-border p-3 font-body text-body-sm text-foreground focus:border-primary focus:ring-1 focus:ring-ring"
              />
            </label>

            {serviceType === 'party' && (
              <div className="flex flex-col gap-1.5">
                <span className="font-headline text-label-sm text-foreground font-bold">Choose Party Theme</span>
                <Select value={partyTheme} onValueChange={setPartyTheme}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose party theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Minecraft Block World">Minecraft Block World</SelectItem>
                    <SelectItem value="Star Wars Galaxy">Star Wars Galaxy</SelectItem>
                    <SelectItem value="Superheroes In Action">Superheroes In Action</SelectItem>
                    <SelectItem value="Battlebots Arena Knockout">Battlebots Arena Knockout</SelectItem>
                    <SelectItem value="Ninjago Spinners">Ninjago Spinners</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </Card>

          <div className="flex gap-3">
            <Button variant="outline" size="lg" onClick={handlePrevStep} className="flex-1">
              Back
            </Button>
            <Button variant="primary" size="lg" onClick={handleNextStep} className="flex-1 gap-2">
              <span>Attendee Info</span>
              <ArrowRight size={16} />
            </Button>
          </div>
        </section>
      )}

      {/* STEP 3: Child & Parent Information */}
      {step === 3 && (
        <section className="flex flex-col gap-gutter-md animate-in fade-in">
          <div>
            <h1 className="font-headline text-headline-lg text-foreground font-bold leading-tight">
              Attendee & Parent Info
            </h1>
            <p className="font-body text-body-sm text-muted-foreground mt-1">
              We need these details to prepare your child's LEGO kit and send arrival instructions.
            </p>
          </div>

          <Card className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col gap-1">
                <span className="font-headline text-label-sm text-foreground font-bold">Child's Name *</span>
                <input
                  type="text"
                  required
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="e.g. Liam"
                  className="w-full rounded-xl bg-card border border-border p-2.5 font-body text-body-sm text-foreground focus:border-primary focus:ring-1 focus:ring-ring"
                />
              </label>

              <div className="flex flex-col gap-1">
                <span className="font-headline text-label-sm text-foreground font-bold">Child's Age *</span>
                <Select value={childAge} onValueChange={setChildAge}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Age" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 yrs (DUPLO)</SelectItem>
                    <SelectItem value="4">4 yrs (Pre-K)</SelectItem>
                    <SelectItem value="5">5 yrs (Kindergarten)</SelectItem>
                    <SelectItem value="6">6 yrs (1st Grade)</SelectItem>
                    <SelectItem value="7">7 yrs (2nd Grade)</SelectItem>
                    <SelectItem value="8">8 yrs (3rd Grade)</SelectItem>
                    <SelectItem value="9">9 yrs (4th Grade)</SelectItem>
                    <SelectItem value="10">10 yrs (5th Grade)</SelectItem>
                    <SelectItem value="11+">11+ yrs (Middle)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <label className="flex flex-col gap-1">
              <span className="font-headline text-label-sm text-foreground font-bold">Parent / Guardian Full Name *</span>
              <input
                type="text"
                required
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="e.g. Jessica Miller"
                className="w-full rounded-xl bg-card border border-border p-2.5 font-body text-body-sm text-foreground focus:border-primary focus:ring-1 focus:ring-ring"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-headline text-label-sm text-foreground font-bold">Email Address (for receipt & waiver) *</span>
              <input
                type="email"
                required
                value={parentEmail}
                onChange={(e) => setParentEmail(e.target.value)}
                placeholder="parent@example.com"
                className="w-full rounded-xl bg-card border border-border p-2.5 font-body text-body-sm text-foreground focus:border-primary focus:ring-1 focus:ring-ring"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-headline text-label-sm text-foreground font-bold">Phone Number *</span>
              <input
                type="tel"
                required
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                placeholder="(615) 555-0199"
                className="w-full rounded-xl bg-card border border-border p-2.5 font-body text-body-sm text-foreground focus:border-primary focus:ring-1 focus:ring-ring"
              />
            </label>
          </Card>

          <div className="flex gap-3">
            <Button variant="outline" size="lg" onClick={handlePrevStep} className="flex-1">
              Back
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={handleNextStep}
              disabled={!parentName || !parentEmail}
              className="flex-1 gap-2"
            >
              <span>Review & Pay</span>
              <ArrowRight size={16} />
            </Button>
          </div>
        </section>
      )}

      {/* STEP 4: Review, Add-ons & Stripe Checkout */}
      {step === 4 && (
        <section className="flex flex-col gap-gutter-md animate-in fade-in">
          <div>
            <h1 className="font-headline text-headline-lg text-foreground font-bold leading-tight">
              Review & Stripe Checkout
            </h1>
            <p className="font-body text-body-sm text-muted-foreground mt-1">
              Confirm your reservation summary before completing payment.
            </p>
          </div>

          {/* Add-ons toggle */}
          <Card className="flex flex-col gap-2.5">
            <h3 className="font-headline text-title-md text-foreground font-bold">Optional Add-ons</h3>
            
            <label className="flex items-center justify-between p-2.5 rounded-lg bg-surface-low border border-border cursor-pointer">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={includeVenue}
                  onChange={(e) => setIncludeVenue(e.target.checked)}
                  className="rounded text-primary focus:ring-primary w-4 h-4"
                />
                <span className="font-body text-body-sm text-foreground">B4K Franklin Venue Rental (2 hours)</span>
              </div>
              <span className="font-mono text-label-sm text-primary font-bold">+$120.00</span>
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-lg bg-surface-low border border-border cursor-pointer">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={includeExtraTshirt}
                  onChange={(e) => setIncludeExtraTshirt(e.target.checked)}
                  className="rounded text-primary focus:ring-primary w-4 h-4"
                />
                <span className="font-body text-body-sm text-foreground">Official B4K Builder T-Shirt</span>
              </div>
              <span className="font-mono text-label-sm text-primary font-bold">+$18.00</span>
            </label>
          </Card>

          {/* Order Summary Receipt Box */}
          <Card className="flex flex-col gap-2.5 border-2 border-primary">
            <h3 className="font-headline text-title-md text-foreground font-bold pb-2 border-b border-border">
              Order Summary
            </h3>

            <div className="flex justify-between text-body-sm">
              <span className="text-muted-foreground">Program:</span>
              <span className="font-bold text-foreground text-right">{itemTitle}</span>
            </div>

            <div className="flex justify-between text-body-sm">
              <span className="text-muted-foreground">Location:</span>
              <span className="text-foreground text-right">{selectedLocation}</span>
            </div>

            <div className="flex justify-between text-body-sm">
              <span className="text-muted-foreground">Dates / Session:</span>
              <span className="text-foreground text-right">{selectedDate}</span>
            </div>

            <div className="flex justify-between text-body-sm">
              <span className="text-muted-foreground">Student:</span>
              <span className="text-foreground text-right">{childName || 'Child'} ({childAge} yrs)</span>
            </div>

            <div className="flex justify-between text-body-sm">
              <span className="text-muted-foreground">Contact:</span>
              <span className="text-foreground text-right">{parentEmail || 'parent@example.com'}</span>
            </div>

            <div className="pt-2 border-t border-border flex items-center justify-between">
              <span className="font-headline text-title-md text-foreground font-bold">Total Due:</span>
              <span className="font-mono text-headline-md text-primary font-bold">${grandTotal}.00</span>
            </div>
          </Card>

          {/* Simulated Stripe Checkout Form */}
          <form onSubmit={handleCompletePayment} className="flex flex-col gap-3">
            <div className="rounded-xl border border-border bg-card p-3 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-label-sm font-bold flex items-center gap-1.5 text-foreground">
                  <CreditCard size={15} className="text-primary" />
                  Mock Card Payment
                </span>
                <span className="text-stripe font-mono font-bold text-xs">stripe verified</span>
              </div>
              <input
                type="text"
                readOnly
                value="4242 •••• •••• 4242"
                className="bg-surface-low border border-border rounded p-2 font-mono text-body-sm text-foreground"
              />
              <div className="grid grid-cols-2 gap-2 text-center font-mono text-xs">
                <div className="bg-surface-low border border-border p-2 rounded">Exp: 12/28</div>
                <div className="bg-surface-low border border-border p-2 rounded">CVC: 888</div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" size="lg" onClick={handlePrevStep} className="flex-1">
                Back
              </Button>
              <Button
                variant="stripe"
                size="lg"
                type="submit"
                isLoading={isProcessing}
                className="flex-1 gap-2 shadow-md"
              >
                <span>Pay ${grandTotal}.00</span>
              </Button>
            </div>
          </form>

          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground text-center">
            <ShieldCheck size={14} className="text-secondary shrink-0" />
            <span>Guaranteed spot reservation with 100% refund policy up to 7 days prior</span>
          </div>
        </section>
      )}

      {/* STEP 5: Confirmation Pass */}
      {step === 5 && isConfirmed && (
        <section className="flex flex-col items-center text-center gap-4 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-secondary/20 text-secondary flex items-center justify-center shadow-sm">
            <CheckCircle2 size={40} />
          </div>

          <div>
            <h1 className="font-headline text-headline-lg text-foreground font-bold">
              Enrollment Confirmed!
            </h1>
            <p className="font-body text-body-sm text-muted-foreground mt-1 max-w-xs">
              Thank you, <strong>{parentName || 'Parent'}</strong>. Your spot has been secured in the Franklin system.
            </p>
          </div>

          {/* Printable Ticket Pass Card */}
          <div className="w-full rounded-2xl bg-card border-2 border-primary p-5 text-left shadow-lg flex flex-col gap-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-xl font-mono uppercase tracking-wider">
              Official Pass #B4K-{Math.floor(100000 + Math.random() * 900000)}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <div className="w-8 h-8 rounded bg-destructive text-destructive-foreground font-bold text-xs flex items-center justify-center">
                B4K
              </div>
              <div>
                <h3 className="font-headline text-title-md text-foreground font-bold leading-tight">
                  {itemTitle}
                </h3>
                <span className="text-xs text-muted-foreground font-medium">Bricks 4 Kidz Franklin, TN</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-body-sm pt-2 border-t border-border">
              <div>
                <span className="text-xs text-muted-foreground block">Student:</span>
                <span className="font-bold text-foreground">{childName || 'Student'} ({childAge} yrs)</span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">Parent:</span>
                <span className="font-bold text-foreground">{parentName || 'Parent'}</span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">Location:</span>
                <span className="font-medium text-foreground text-xs">{selectedLocation}</span>
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">Dates:</span>
                <span className="font-medium text-foreground text-xs">{selectedDate}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-dashed border-border mt-1">
              <div className="flex items-center gap-2">
                <QrCode size={36} className="text-primary" />
                <div className="text-[10px] text-muted-foreground leading-tight">
                  Present this QR at check-in<br />Photo ID required for release
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-muted-foreground block">Paid via Stripe:</span>
                <span className="font-mono text-title-md text-primary font-bold">${grandTotal}.00</span>
              </div>
            </div>
          </div>

          <div className="w-full flex gap-3 pt-2">
            <Button
              variant="outline"
              size="md"
              className="flex-1 gap-1.5"
              onClick={() => window.print()}
            >
              <Printer size={16} />
              <span>Print Pass</span>
            </Button>
            <Button
              variant="primary"
              size="md"
              className="flex-1"
              onClick={() => {
                setStep(1);
                setIsConfirmed(false);
              }}
            >
              Book Another Session
            </Button>
          </div>
        </section>
      )}

    </div>
  );
};
